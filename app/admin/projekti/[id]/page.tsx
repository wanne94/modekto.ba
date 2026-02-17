'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAdmin } from '../../../../lib/admin-context';
import { ProjectForm } from '../../../../components/admin/ProjectForm';

export default function EditProjekatPage() {
  const { id } = useParams<{ id: string }>();
  const { projects } = useAdmin();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Projekat nije pronađen.</p>
        <Link href="/admin/projekti" className="text-amber-600 hover:underline text-sm mt-2 inline-block">
          ← Nazad na projekte
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/projekti" className="text-gray-400 hover:text-gray-600 text-sm">
          ← Nazad
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Uredi: {project.title}</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <ProjectForm mode="edit" initial={project} />
      </div>
    </div>
  );
}
