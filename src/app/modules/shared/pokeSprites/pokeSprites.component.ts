import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../../../entities/pokemon.entity';
import { Showdown, Sprites } from '../../../../../entities/sprites.entity';
import { Versions } from '../../../../../entities/versions.entity';

/** Collect sprite URLs in display order; drops empty entries. */
function pack(...urls: (string | null | undefined)[]): string[] {
  return urls.filter((u): u is string => !!u);
}

export interface LabeledSprite {
  url: string;
  labelEs: string;
  labelEn: string;
  /** Optional stable id (e.g. Showdown key) for ordering. */
  id?: string;
}

@Component({
  selector: 'app-poke-sprites',
  templateUrl: './pokeSprites.component.html',
  styleUrls: ['./pokeSprites.component.scss']
})
export class PokeSpritesComponent {
  @Input() pokemon: Pokemon;
  @Input() language: string = 'en';

  get sprites(): Sprites | undefined {
    return this.pokemon?.sprites;
  }

  get versions(): Versions | undefined {
    return this.sprites?.versions;
  }

  t(es: string, en: string): string {
    return this.language === 'es' ? es : en;
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByLabeledId(_i: number, s: LabeledSprite): string {
    return s.id ?? s.url;
  }

  // ——— API root (default) sprites ———
  get rootSpriteSlots(): LabeledSprite[] {
    const s = this.sprites;
    if (!s) {
      return [];
    }
    const slots: LabeledSprite[] = [];
    const push = (url: string | null | undefined, labelEs: string, labelEn: string) => {
      if (url) {
        slots.push({ url, labelEs, labelEn });
      }
    };
    push(s.front_default, 'Frente', 'Front');
    push(s.back_default, 'Espalda', 'Back');
    push(s.front_shiny, 'Frente (shiny)', 'Shiny front');
    push(s.back_shiny, 'Espalda (shiny)', 'Shiny back');
    push(s.front_female, 'Frente (♀)', 'Front (♀)');
    push(s.back_female, 'Espalda (♀)', 'Back (♀)');
    push(s.front_shiny_female, 'Frente shiny (♀)', 'Shiny front (♀)');
    push(s.back_shiny_female, 'Espalda shiny (♀)', 'Shiny back (♀)');
    return slots;
  }

  // ——— other.dream_world ———
  get dreamWorldSlots(): LabeledSprite[] {
    const d = this.sprites?.other?.['dream_world'];
    if (!d) {
      return [];
    }
    const out: LabeledSprite[] = [];
    if (d.front_default) {
      out.push({ url: d.front_default, labelEs: 'Frente', labelEn: 'Front' });
    }
    if (d.front_female) {
      out.push({ url: d.front_female, labelEs: 'Frente (♀)', labelEn: 'Front (♀)' });
    }
    return out;
  }

  // ——— other.home ———
  get homeSlots(): LabeledSprite[] {
    const h = this.sprites?.other?.home;
    if (!h) {
      return [];
    }
    const out: LabeledSprite[] = [];
    if (h.front_default) {
      out.push({ url: h.front_default, labelEs: 'Frente', labelEn: 'Front' });
    }
    if (h.front_shiny) {
      out.push({ url: h.front_shiny, labelEs: 'Frente (shiny)', labelEn: 'Shiny front' });
    }
    if (h.front_female) {
      out.push({ url: h.front_female, labelEs: 'Frente (♀)', labelEn: 'Front (♀)' });
    }
    if (h.front_shiny_female) {
      out.push({ url: h.front_shiny_female, labelEs: 'Frente shiny (♀)', labelEn: 'Shiny front (♀)' });
    }
    return out;
  }

  // ——— other["official-artwork"] ———
  get officialArtworkSlots(): LabeledSprite[] {
    const a = this.sprites?.other?.['official-artwork'];
    if (!a) {
      return [];
    }
    const out: LabeledSprite[] = [];
    if (a.front_default) {
      out.push({ url: a.front_default, labelEs: 'Arte oficial', labelEn: 'Official artwork' });
    }
    if (a.front_shiny) {
      out.push({ url: a.front_shiny, labelEs: 'Arte shiny', labelEn: 'Shiny artwork' });
    }
    return out;
  }

  // ——— other.showdown ———
  get showdownSlots(): LabeledSprite[] {
    const sd = this.sprites?.other?.showdown;
    if (!sd) {
      return [];
    }
    const out: LabeledSprite[] = [];
    (Object.keys(sd) as (keyof Showdown)[]).forEach((key) => {
      const value = sd[key];
      if (value) {
        const { es, en } = this.showdownKeyLabels(key);
        out.push({ id: key, url: value, labelEs: es, labelEn: en });
      }
    });
    return out.sort((a, b) => (a.id ?? '').localeCompare(b.id ?? ''));
  }

  private showdownKeyLabels(key: string): { es: string; en: string } {
    const map: Record<string, { es: string; en: string }> = {
      back_default: { es: 'Espalda', en: 'Back' },
      back_female: { es: 'Espalda (♀)', en: 'Back (♀)' },
      back_shiny: { es: 'Espalda (shiny)', en: 'Shiny back' },
      back_shiny_female: { es: 'Espalda shiny (♀)', en: 'Shiny back (♀)' },
      front_default: { es: 'Frente', en: 'Front' },
      front_female: { es: 'Frente (♀)', en: 'Front (♀)' },
      front_shiny: { es: 'Frente (shiny)', en: 'Shiny front' },
      front_shiny_female: { es: 'Frente shiny (♀)', en: 'Shiny front (♀)' }
    };
    return map[key] ?? { es: key.replace(/_/g, ' '), en: key.replace(/_/g, ' ') };
  }

  get hasOtherGroup(): boolean {
    return (
      this.dreamWorldSlots.length > 0 ||
      this.homeSlots.length > 0 ||
      this.officialArtworkSlots.length > 0 ||
      this.showdownSlots.length > 0
    );
  }

  get hasVersionGameSprites(): boolean {
    return (
      this.gen1RedBlue.length > 0 ||
      this.gen2Crystal.length > 0 ||
      this.gen2Gold.length > 0 ||
      this.gen2Silver.length > 0 ||
      this.gen3Emerald.length > 0 ||
      this.gen3RubySapphire.length > 0 ||
      this.gen3FrLg.length > 0 ||
      this.gen4DiamondPearl.length > 0 ||
      this.gen4Platinum.length > 0 ||
      this.gen4HeartGoldSoulSilver.length > 0 ||
      this.gen5BlackWhite.length > 0 ||
      this.gen6Xy.length > 0 ||
      this.gen6Oras.length > 0 ||
      this.gen7UsUm.length > 0
    );
  }

  // ——— Generation I ———
  get gen1RedBlue(): string[] {
    const v = this.versions?.['generation-i']?.['red-blue'];
    if (!v) {
      return [];
    }
    return pack(v.front_transparent, v.back_transparent);
  }

  // ——— Generation II ———
  get gen2Crystal(): string[] {
    const c = this.versions?.['generation-ii']?.crystal;
    if (!c) {
      return [];
    }
    return pack(
      c.front_transparent,
      c.back_transparent,
      c.front_shiny_transparent,
      c.back_shiny_transparent
    );
  }

  get gen2Gold(): string[] {
    const g = this.versions?.['generation-ii']?.gold;
    if (!g) {
      return [];
    }
    return pack(g.front_transparent, g.back_default, g.front_shiny, g.back_shiny);
  }

  get gen2Silver(): string[] {
    const s = this.versions?.['generation-ii']?.silver;
    if (!s) {
      return [];
    }
    return pack(s.front_transparent, s.back_default, s.front_shiny, s.back_shiny);
  }

  // ——— Generation III ———
  get gen3Emerald(): string[] {
    const e = this.versions?.['generation-iii']?.emerald;
    if (!e) {
      return [];
    }
    return pack(e.front_default, e.front_shiny);
  }

  get gen3RubySapphire(): string[] {
    const v = this.versions?.['generation-iii']?.['ruby-sapphire'];
    if (!v) {
      return [];
    }
    return pack(v.front_default, v.back_default, v.front_shiny, v.back_shiny);
  }

  get gen3FrLg(): string[] {
    const v = this.versions?.['generation-iii']?.['firered-leafgreen'];
    if (!v) {
      return [];
    }
    return pack(v.front_default, v.back_default, v.front_shiny, v.back_shiny);
  }

  // ——— Generation IV ———
  get gen4DiamondPearl(): string[] {
    const v = this.versions?.['generation-iv']?.['diamond-pearl'];
    if (!v) {
      return [];
    }
    return pack(v.front_default, v.front_shiny, v.back_default, v.back_shiny);
  }

  get gen4Platinum(): string[] {
    const v = this.versions?.['generation-iv']?.platinum;
    if (!v) {
      return [];
    }
    return pack(v.front_default, v.back_default, v.front_shiny, v.back_shiny);
  }

  get gen4HeartGoldSoulSilver(): string[] {
    const v = this.versions?.['generation-iv']?.['heartgold-soulsilver'];
    if (!v) {
      return [];
    }
    return pack(v.front_default, v.back_default, v.front_shiny, v.back_shiny);
  }

  // ——— Generation V ———
  get gen5BlackWhite(): string[] {
    const bw = this.versions?.['generation-v']?.['black-white'];
    const a = bw?.animated;
    if (!a) {
      return [];
    }
    return pack(a.front_default, a.front_shiny, a.back_default, a.back_shiny);
  }

  // ——— Generation VI ———
  get gen6Xy(): string[] {
    const v = this.versions?.['generation-vi']?.['x-y'];
    if (!v) {
      return [];
    }
    return pack(v.front_default, v.front_female, v.front_shiny, v.front_shiny_female);
  }

  get gen6Oras(): string[] {
    const v = this.versions?.['generation-vi']?.['omegaruby-alphasapphire'];
    if (!v) {
      return [];
    }
    return pack(v.front_default, v.front_female, v.front_shiny, v.front_shiny_female);
  }

  // ——— Generation VII (Ultra Sun / Ultra Moon assets) ———
  get gen7UsUm(): string[] {
    const v = this.versions?.['generation-vii']?.['ultra-sun-ultra-moon'];
    if (!v) {
      return [];
    }
    return pack(v.front_default, v.front_female, v.front_shiny, v.front_shiny_female);
  }
}
