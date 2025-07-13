import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  adminId?: string;
  volunteerId?: string;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export function AssociateEventPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: "",
  });
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);


  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("user") || "{}")?.role;
  const userId = localStorage.getItem("userId");

  const fetchEvents = async () => {
    if (!token || !userId || !role) {
      alert("User not authenticated");
      return;
    }

    try {
      setFetching(true);
      let url = `${BACKEND_URL}/event/get?`;

      if (role === "admin" || role === "associate") {
        url += `adminId=${userId}`;
      } else if (role === "volunteer") {
        url += `volunteerId=${userId}`;
      } else {
        alert("Invalid role");
        return;
      }

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events", error);
      alert("Failed to load events");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddDialog = () => {
    setEditingEventId(null);
    setForm({ title: "", description: "", date: "", location: "", image: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (event: Event) => {
    setEditingEventId(event._id);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date.split("T")[0],
      location: event.location,
      image: event.image,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!token || !userId || !role) {
      alert("User not authenticated");
      return;
    }
    setLoading(true);
    try {
      const method = editingEventId ? "PUT" : "POST";
      const url = editingEventId
        ? `${BACKEND_URL}/event/update/${editingEventId}`
        : `${BACKEND_URL}/event/create`;

      const bodyData =
        role === "admin" || role === "associate"
          ? { ...form, adminId: userId }
          : { ...form, volunteerId: userId };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) throw new Error("Failed to save event");

      setIsDialogOpen(false);
      fetchEvents();
    } catch (error) {
      console.error(error);
      alert("Error saving event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/event/remove/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete event");
      fetchEvents();
    } catch (error) {
      console.error(error);
      alert("Error deleting event");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
        {(role === "admin" || role === "associate") && (
          <Button onClick={openAddDialog} variant="outline">
            Add New Event
          </Button>
        )}
      </header>

      {fetching ? (
        <p>Loading events...</p>
      ) : (
        <div className="space-y-6">
          {events.length === 0 ? (
            <p className="text-gray-500">No events found.</p>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                className="border p-4 rounded shadow-sm flex flex-col md:flex-row md:justify-between md:items-center"
              >
                <div className="md:w-3/4">
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <p>{event.description}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString()} -{" "}
                    {event.location}
                  </p>
                  {event.image && (
                    <img
                      src={event.image}
                      alt="event"
                      className="mt-2 w-full max-w-xs rounded shadow"
                    />
                  )}
                </div>

                {(role === "admin" || role === "associate") && (
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(event)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingEventId ? "Update Event" : "Add New Event"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />
            <Textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows={4}
            />
            <Input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
            />
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-2 w-full h-48 object-cover rounded"
              />
            )}
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : editingEventId ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
