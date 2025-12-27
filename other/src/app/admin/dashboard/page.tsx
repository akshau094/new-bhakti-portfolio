"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type TimelineItem = {
  title: string;
  subtitle: string;
  period: string;
  description: string[];
};

type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  link: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<"work" | "education" | "projects">("work");
  
  // Data states
  const [work, setWork] = useState<TimelineItem[]>([]);
  const [education, setEducation] = useState<TimelineItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin");
    }

    // Load existing data from localStorage or use defaults
    const savedWork = localStorage.getItem("portfolio_work");
    const savedEducation = localStorage.getItem("portfolio_education");
    const savedProjects = localStorage.getItem("portfolio_projects");

    if (savedWork) setWork(JSON.parse(savedWork));
    if (savedEducation) setEducation(JSON.parse(savedEducation));
    if (savedProjects) setProjects(JSON.parse(savedProjects));
  }, [router]);

  const saveToWebsite = () => {
    localStorage.setItem("portfolio_work", JSON.stringify(work));
    localStorage.setItem("portfolio_education", JSON.stringify(education));
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
    setHasUnsavedChanges(false);
    alert("Changes saved to website successfully!");
  };

  const addItem = () => {
    if (activeSection === "work" || activeSection === "education") {
      const newItem: TimelineItem = {
        title: "",
        subtitle: "",
        period: "",
        description: [""]
      };
      if (activeSection === "work") setWork([...work, newItem]);
      else setEducation([...education, newItem]);
    } else {
      const newItem: ProjectItem = {
        title: "",
        description: "",
        tags: [""],
        link: "#"
      };
      setProjects([...projects, newItem]);
    }
    setHasUnsavedChanges(true);
  };

  const deleteItem = (index: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    if (activeSection === "work") {
      const newData = work.filter((_, i) => i !== index);
      setWork(newData);
    } else if (activeSection === "education") {
      const newData = education.filter((_, i) => i !== index);
      setEducation(newData);
    } else {
      const newData = projects.filter((_, i) => i !== index);
      setProjects(newData);
    }
    setHasUnsavedChanges(true);
  };

  const updateItem = (index: number, field: string, value: any) => {
    setHasUnsavedChanges(true);
    if (activeSection === "work") {
      const currentData = [...work];
      currentData[index] = { ...currentData[index], [field]: value };
      setWork(currentData);
    } else if (activeSection === "education") {
      const currentData = [...education];
      currentData[index] = { ...currentData[index], [field]: value };
      setEducation(currentData);
    } else {
      const currentProjects = [...projects];
      currentProjects[index] = { ...currentProjects[index], [field]: value };
      setProjects(currentProjects);
    }
  };

  const updateDescription = (itemIndex: number, descIndex: number, value: string) => {
    setHasUnsavedChanges(true);
    const currentData = [...(activeSection === "work" ? work : education)];
    currentData[itemIndex].description[descIndex] = value;
    if (activeSection === "work") setWork(currentData);
    else setEducation(currentData);
  };

  const addDescriptionLine = (itemIndex: number) => {
    setHasUnsavedChanges(true);
    const currentData = [...(activeSection === "work" ? work : education)];
    currentData[itemIndex].description.push("");
    if (activeSection === "work") setWork(currentData);
    else setEducation(currentData);
  };

  const deleteDescriptionLine = (itemIndex: number, descIndex: number) => {
    const currentData = [...(activeSection === "work" ? work : education)];
    currentData[itemIndex].description = currentData[itemIndex].description.filter((_, i) => i !== descIndex);
    if (activeSection === "work") setWork(currentData);
    else setEducation(currentData);
    setHasUnsavedChanges(true);
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Developer Admin</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Manage your portfolio content</p>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.push("/")}
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Go to Website
            </button>
            {hasUnsavedChanges && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={saveToWebsite}
                className="rounded-full bg-green-500 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-green-500/20 transition-all hover:bg-green-600 active:scale-95"
              >
                Save to Website
              </motion.button>
            )}
            <button onClick={logout} className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-600">
              Logout
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="mb-8 flex gap-4">
          {(["work", "education", "projects"] as const).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`rounded-xl px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                activeSection === section 
                ? "bg-zinc-900 text-white shadow-lg" 
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Content List */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {(activeSection === "projects" ? projects : activeSection === "work" ? work : education).map((item: any, index: number) => (
                <div key={index} className="group relative rounded-2xl border border-zinc-100 bg-zinc-50/50 p-6 shadow-sm transition-all hover:border-zinc-200 hover:bg-zinc-50">
                  <button
                    onClick={() => deleteItem(index)}
                    className="absolute -right-2 -top-2 hidden h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-all hover:bg-red-600 group-hover:flex active:scale-90"
                    title="Delete item"
                  >
                    <span className="text-lg">×</span>
                  </button>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Title / Company</label>
                      <input
                        value={item.title}
                        onChange={(e) => updateItem(index, "title", e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                        placeholder="e.g. PERCEPTRA COMPANY LIMITED"
                      />
                    </div>
                    {activeSection !== "projects" && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Subtitle / Role</label>
                        <input
                          value={item.subtitle}
                          onChange={(e) => updateItem(index, "subtitle", e.target.value)}
                          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                          placeholder="e.g. Junior Software Engineer"
                        />
                      </div>
                    )}
                    {activeSection !== "projects" ? (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Period</label>
                        <input
                          value={item.period}
                          onChange={(e) => updateItem(index, "period", e.target.value)}
                          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                          placeholder="e.g. Aug 2025 - Current"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Project Link</label>
                        <input
                          value={item.link}
                          onChange={(e) => updateItem(index, "link", e.target.value)}
                          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                          placeholder="e.g. # or https://..."
                        />
                      </div>
                    )}
                  </div>

                  {/* Description / Tags */}
                  <div className="mt-4 space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      {activeSection === "projects" ? "Tech Stack (comma separated)" : "Description Points"}
                    </label>
                    {activeSection === "projects" ? (
                      <textarea
                        value={item.tags?.join(", ")}
                        onChange={(e) => updateItem(index, "tags", e.target.value.split(",").map(t => t.trim()))}
                        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                        rows={2}
                      />
                    ) : (
                      <div className="space-y-2">
                        {item.description.map((desc: string, dIdx: number) => (
                          <div key={dIdx} className="flex gap-2">
                            <input
                              value={desc}
                              onChange={(e) => updateDescription(index, dIdx, e.target.value)}
                              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                              placeholder="Add a point..."
                            />
                            <button
                              onClick={() => deleteDescriptionLine(index, dIdx)}
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 hover:border-red-500 hover:text-red-500 transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addDescriptionLine(index)}
                          className="text-[10px] font-bold uppercase tracking-widest text-green-500 hover:text-green-600"
                        >
                          + Add Line
                        </button>
                      </div>
                    )}
                    {activeSection === "projects" && (
                      <div className="mt-2 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Project Description</label>
                        <textarea
                          value={item.description}
                          onChange={(e) => updateItem(index, "description", e.target.value)}
                          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                          rows={3}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={addItem}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-200 py-8 text-zinc-400 transition-all hover:border-green-500 hover:text-green-500"
          >
            <span className="text-2xl">+</span>
            <span className="text-xs font-bold uppercase tracking-widest">Add {activeSection}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
