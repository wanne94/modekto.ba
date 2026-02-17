'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HouseDesign } from '../../types';
import { useAdmin } from '../../lib/admin-context';

type FormMode = 'add' | 'edit';

interface ProjectFormProps {
  mode: FormMode;
  initial?: HouseDesign;
}

const CATEGORIES: HouseDesign['category'][] = ['Moderni', 'Alpski', 'Mediteranski', 'Mala Kuća'];
const ENERGY_CLASSES = ['A+', 'A', 'B', 'C', 'D'];

function defaultForm(): Omit<HouseDesign, 'id'> {
  return {
    title: '',
    description: '',
    price: 0,
    sqMeters: 0,
    bedrooms: 1,
    bathrooms: 1,
    imageUrl: '',
    category: 'Moderni',
    featured: false,
    floors: 1,
    garage: false,
    energyClass: 'B',
    terraceArea: 0,
    features: [],
  };
}

export function ProjectForm({ mode, initial }: ProjectFormProps) {
  const router = useRouter();
  const { addProject, updateProject } = useAdmin();

  const [form, setForm] = useState<Omit<HouseDesign, 'id'>>(
    initial ? { ...initial } : defaultForm()
  );
  const [featureInput, setFeatureInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof form, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Naslov je obavezan';
    if (!form.description.trim()) e.description = 'Opis je obavezan';
    if (form.price <= 0) e.price = 'Cijena mora biti pozitivna';
    if (form.sqMeters <= 0) e.sqMeters = 'Površina mora biti pozitivna';
    if (!form.imageUrl.trim()) e.imageUrl = 'URL slike je obavezan';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'add') {
      addProject(form);
    } else if (initial) {
      updateProject(initial.id, form);
    }
    router.push('/admin/projekti');
  };

  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !form.features?.includes(trimmed)) {
      set('features', [...(form.features ?? []), trimmed]);
    }
    setFeatureInput('');
  };

  const removeFeature = (f: string) =>
    set('features', (form.features ?? []).filter((x) => x !== f));

  const field = (
    label: string,
    key: keyof typeof form,
    type: string = 'text',
    extra?: object
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={String(form[key] ?? '')}
        onChange={(e) =>
          set(key, type === 'number' ? Number(e.target.value) : e.target.value)
        }
        className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 ${
          errors[key] ? 'border-red-400' : 'border-gray-300'
        }`}
        {...extra}
      />
      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {field('Naslov', 'title')}
        {field('URL slike', 'imageUrl')}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          rows={3}
          className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 ${
            errors.description ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {field('Cijena (KM/m²)', 'price', 'number')}
        {field('Površina (m²)', 'sqMeters', 'number')}
        {field('Spavaće sobe', 'bedrooms', 'number')}
        {field('Kupatila', 'bathrooms', 'number')}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {field('Spratovi', 'floors', 'number')}
        {field('Terasa (m²)', 'terraceArea', 'number')}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategorija</label>
          <select
            value={form.category}
            onChange={(e) => set('category', e.target.value as HouseDesign['category'])}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Energetska klasa</label>
          <select
            value={form.energyClass ?? 'B'}
            onChange={(e) => set('energyClass', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {ENERGY_CLASSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured ?? false}
            onChange={(e) => set('featured', e.target.checked)}
            className="rounded"
          />
          Featured projekt
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={form.garage ?? false}
            onChange={(e) => set('garage', e.target.checked)}
            className="rounded"
          />
          Garaža
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Karakteristike</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            placeholder="Dodaj karakteristiku..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            type="button"
            onClick={addFeature}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
          >
            Dodaj
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {(form.features ?? []).map((f) => (
            <span
              key={f}
              className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs"
            >
              {f}
              <button type="button" onClick={() => removeFeature(f)} className="hover:text-red-600 ml-1">×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg text-sm transition-colors"
        >
          {mode === 'add' ? 'Dodaj projekt' : 'Sačuvaj izmjene'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/projekti')}
          className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition-colors"
        >
          Odustani
        </button>
      </div>
    </form>
  );
}
