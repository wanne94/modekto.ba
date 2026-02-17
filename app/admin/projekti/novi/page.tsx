'use client';

import Link from 'next/link';
import { ProjectForm } from '../../../../components/admin/ProjectForm';

export default function NoviProjekatPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/projekti" className="text-gray-400 hover:text-gray-600 text-sm">
          ← Nazad
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Novi projekt</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <ProjectForm mode="add" />
      </div>
    </div>
  );
}
