import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface RsvpPayload {
  id?: string;
  name: string;
  side: 'groom' | 'bride';
  attend: 'yes' | 'maybe' | 'no';
  count: number;
  message?: string;
  created_at?: string;
  createdAt?: string;
}

export const rsvpService = {
  async submitRsvp(payload: RsvpPayload): Promise<boolean> {
    const timestamp = new Date().toISOString();

    // 1. Try Supabase cloud database if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('rsvp')
          .insert([
            {
              name: payload.name.trim(),
              side: payload.side,
              attend: payload.attend,
              count: payload.count,
              message: payload.message?.trim() || '',
              created_at: timestamp
            }
          ]);

        if (error) {
          console.warn('Supabase RSVP insert error, falling back to local storage:', error.message);
        } else {
          // Backup locally as well
          this.backupLocally(payload, timestamp);
          return true;
        }
      } catch (err) {
        console.warn('Supabase RSVP network error:', err);
      }
    }

    // 2. Local fallback if Supabase not configured or failed
    try {
      this.backupLocally(payload, timestamp);
      return true;
    } catch (err) {
      console.error('RSVP local storage error:', err);
      return false;
    }
  },

  backupLocally(payload: RsvpPayload, timestamp: string) {
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvp_list') || '[]');
      existing.unshift({
        ...payload,
        id: Date.now().toString(),
        createdAt: timestamp,
        created_at: timestamp
      });
      localStorage.setItem('wedding_rsvp_list', JSON.stringify(existing));
    } catch (e) {
      console.error('LocalStorage backup error', e);
    }
  },

  async getRsvpList(): Promise<RsvpPayload[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('rsvp')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data;
        }
      } catch (err) {
        console.warn('Failed to fetch RSVP from Supabase:', err);
      }
    }

    // Fallback
    try {
      return JSON.parse(localStorage.getItem('wedding_rsvp_list') || '[]');
    } catch {
      return [];
    }
  }
};
