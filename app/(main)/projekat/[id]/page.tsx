import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectById, getSimilarProjects, UPSELL_OPTIONS } from '@/lib/projects';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  BedDouble,
  Bath,
  Ruler,
  ShoppingCart,
  Phone,
  ChevronRight,
  Utensils,
  UtensilsCrossed,
  Check,
  FileText,
  Pencil,
  Users,
} from 'lucide-react';
import { CheckoutSection } from '@/components/CheckoutSection';
import { FloorPlanSVG } from '@/components/FloorPlanSVG';
import { ProjectImageGallery } from '@/components/ProjectImageGallery';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjekatPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const similar = getSimilarProjects(project);
  const allImages = [project.imageUrl, ...(project.images ?? [])];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Početna</Link>
            <ChevronRight size={14} />
            <Link href="/#kolekcija" className="hover:text-foreground transition-colors">Kolekcija</Link>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium">{project.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero section */}
      <section className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Gallery (60%) */}
          <div className="lg:col-span-3">
            <ProjectImageGallery
              images={allImages}
              title={project.title}
              featured={project.featured}
            />
          </div>

          {/* Right: Sticky info card (40%) */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-6 space-y-5 border rounded-xl p-6 shadow-sm bg-card">
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{project.category}</Badge>
                {project.featured && (
                  <Badge className="bg-yellow-500 text-white border-none">Izdvojeno</Badge>
                )}
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <Ruler size={18} className="text-primary shrink-0" />
                  <div>
                    <div className="text-muted-foreground text-xs">Površina</div>
                    <div className="font-semibold">{project.sqMeters} m²</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <BedDouble size={18} className="text-primary shrink-0" />
                  <div>
                    <div className="text-muted-foreground text-xs">Sobe</div>
                    <div className="font-semibold">{project.bedrooms} {project.bedrooms === 1 ? 'soba' : 'sobe'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <Bath size={18} className="text-primary shrink-0" />
                  <div>
                    <div className="text-muted-foreground text-xs">Kupaonice</div>
                    <div className="font-semibold">{project.bathrooms} {project.bathrooms === 1 ? 'kupaonica' : 'kupaonice'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  {project.kitchen
                    ? <Utensils size={18} className="text-primary shrink-0" />
                    : <UtensilsCrossed size={18} className="text-muted-foreground shrink-0" />}
                  <div>
                    <div className="text-muted-foreground text-xs">Kuhinja</div>
                    <div className="font-semibold">{project.kitchen ? 'Da' : 'Ne'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 col-span-2">
                  <Ruler size={18} className="text-primary shrink-0" />
                  <div>
                    <div className="text-muted-foreground text-xs">Terasa</div>
                    <div className="font-semibold">{project.terraceArea ? `${project.terraceArea} m²` : '—'}</div>
                  </div>
                </div>
              </div>

              <CheckoutSection
                basePrice={project.price}
                projectTitle={project.title}
                projectId={project.id}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Details sections */}
      <section className="container mx-auto px-4 md:px-6 pb-16 space-y-12">

        {/* O projektu */}
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">O projektu</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>
          {project.features && project.features.length > 0 && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tlocrt */}
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Tlocrt</h2>
          <div className="rounded-xl border bg-muted/20 p-6">
            <FloorPlanSVG floors={project.floors ?? 1} />
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Prikazani tlocrt je samo primjer rasporeda prostorija. Pravi tlocrt s tačnim dimenzijama dobijate pri kupovini projekta.
          </p>
        </div>

        {/* Šta je uključeno / Šta nije uključeno */}
        <div className="max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Šta je uključeno</h2>
            <ul className="space-y-3">
              {[
                { icon: FileText, text: 'Kompletna PDF dokumentacija projekta' },
                { icon: Pencil, text: 'Tehnički crteži u DWG i PDF formatu' },
                { icon: Users, text: 'Besplatna konzultacija s arhitektom (30 min)' },
                { icon: Check, text: 'Detaljne specifikacije materijala' },
                { icon: Check, text: 'Energetska analiza i certifikat' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 text-sm">
                  <Icon size={18} className="text-primary shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Šta nije uključeno</h2>
            <ul className="space-y-3">
              {[
                'Glavni projekat',
                'Instalacije (el., vod., grijanje)',
                'Statički / konstruktivni proračun',
                'Ishođenje građevinske dozvole',
                'Nadzor i izvođenje radova',
              ].map((text) => (
                <li key={text} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 text-sm text-muted-foreground">
                  <span className="shrink-0 text-base leading-none">✕</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Šta se može dokupiti */}
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Šta se može dokupiti</h2>
          <ul className="space-y-3">
            {UPSELL_OPTIONS.map((opt) => (
              <li key={opt.id} className="flex items-start justify-between gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20 text-sm">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 text-primary font-bold text-base leading-none">+</span>
                  <div>
                    <span className="font-medium">{opt.label}</span>
                    <p className="text-muted-foreground mt-0.5">{opt.description}</p>
                  </div>
                </div>
                <span className="shrink-0 font-bold text-primary">{opt.price} €</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            Dodaci se biraju pri narudžbi. <Link href={`/checkout/${project.id}`} className="underline underline-offset-2 hover:text-foreground transition-colors">Naruči projekat</Link> i odaberi željene dodatke.
          </p>
        </div>
      </section>

      {/* Similar projects */}
      {similar.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">Slični projekti</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similar.map((house) => (
                <Link key={house.id} href={`/projekat/${house.id}`} className="block">
                  <Card className="overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 h-full">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={house.imageUrl}
                        alt={house.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      {house.featured && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500 text-white border-none">
                          Izdvojeno
                        </Badge>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <span className="text-white/30 text-2xl font-bold tracking-widest uppercase select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                          MODEKTO.BA
                        </span>
                      </div>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{house.title}</CardTitle>
                        <div className="font-bold text-primary">{formatPrice(house.price)}</div>
                      </div>
                      <CardDescription className="line-clamp-2">{house.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Ruler size={14} />{house.sqMeters}m²</span>
                        <span className="flex items-center gap-1"><BedDouble size={14} />{house.bedrooms} {house.bedrooms === 1 ? 'soba' : 'sobe'}</span>
                        <span className="flex items-center gap-1"><Bath size={14} />{house.bathrooms} {house.bathrooms === 1 ? 'kupaonica' : 'kupaonice'}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full gap-2" size="sm">
                        <ShoppingCart size={14} />
                        Naruči Projekt
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
