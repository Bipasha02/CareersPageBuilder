import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function SectionsList({ companyId }) {
  const [sections, setSections] = useState([]);
  const API = import.meta.env.VITE_API_BASE || "http://localhost:8000";

  // Load sections
  useEffect(() => {
    async function fetchSections() {
      try {
        const res = await axios.get(`${API}/api/company/${companyId}/preview`);
        setSections(res.data.sections || []);
      } catch (err) {
        console.error("Failed to fetch sections", err);
      }
    }
    fetchSections();
  }, [companyId]);

  // Handle drag end
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedSections = Array.from(sections);
    const [moved] = updatedSections.splice(result.source.index, 1);
    updatedSections.splice(result.destination.index, 0, moved);

    setSections(updatedSections);

    // Optional: persist new order in backend
    try {
      await axios.put(`${API}/api/sections/reorder`, {
        company_id: companyId,
        sections: updatedSections.map((s, idx) => ({ id: s.id, position: idx + 1 })),
      });
      console.log("✅ Sections reordered successfully");
    } catch (err) {
      console.error("Failed to save section order", err);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {sections.map((sec, index) => (
              <Draggable key={sec.id} draggableId={sec.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-3 mb-2 border rounded bg-gray-50"
                  >
                    {sec.title}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
