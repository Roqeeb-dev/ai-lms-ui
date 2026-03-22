"use client";

import { Users, MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import CourseDropdown from "./CourseDropdown";

interface InstructorFooterProps {
  totalStudents: number;
  onEdit: () => void;
  onDelete?: () => void;
  onToggle?: () => void;
}

export function InstructorFooter({
  totalStudents,
  onEdit,
  onDelete,
  onToggle,
}: InstructorFooterProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex items-center gap-1 text-xs text-foreground-muted">
        <Users size={12} />
        <span>{totalStudents} students</span>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen((prev) => !prev);
          }}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <MoreVertical size={15} />
        </button>
        {dropdownOpen && (
          <CourseDropdown
            onEdit={() => {
              onEdit();
              setDropdownOpen(false);
            }}
            onDelete={() => {
              onDelete?.();
              setDropdownOpen(false);
            }}
            onToggle={() => {
              onToggle?.();
              setDropdownOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
}
