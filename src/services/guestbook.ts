import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  drawingUrl?: string;
  createdAt: string;
  created_at?: string;
}

const DRAWING_PREFIX = '[DRAWING]:';

const DEFAULT_ENTRIES: GuestbookEntry[] = [
  {
    id: '1',
    name: '김민석',
    message: '성규야, 현지 씨와 결혼 진심으로 축하한다! 라도무스 루미니스홀에서 가장 빛날 두 사람의 앞날을 온 마음으로 축복해.',
    createdAt: '2027-04-20T09:00:00Z'
  },
  {
    id: '2',
    name: '이지연',
    message: '세상에서 제일 사랑스러운 현지야! 영원히 서로의 가장 든든한 편이 되어주길 바랄게. 결혼 진심으로 축하해 🎉',
    createdAt: '2027-04-22T10:15:00Z'
  }
];

function parseEntry(rawId: string | number, name: string, rawMessage: string, rawCreatedAt?: string): GuestbookEntry {
  let message = rawMessage || '';
  let drawingUrl: string | undefined = undefined;

  if (message.includes(DRAWING_PREFIX)) {
    const parts = message.split(DRAWING_PREFIX);
    message = parts[0]?.trim() || '';
    drawingUrl = parts[1]?.trim() || undefined;
  }

  return {
    id: String(rawId),
    name: name || '하객',
    message,
    drawingUrl,
    createdAt: rawCreatedAt || new Date().toISOString()
  };
}

export const guestbookService = {
  async getEntries(): Promise<GuestbookEntry[]> {
    // 1. Try Supabase cloud database
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('guestbook')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((item) =>
            parseEntry(item.id, item.name, item.message, item.created_at || item.createdAt)
          );
        }
      } catch (err) {
        console.warn('Supabase guestbook fetch error, falling back to local:', err);
      }
    }

    // 2. Fallback to localStorage
    try {
      const stored = localStorage.getItem('wedding_guestbook_list_v2');
      if (!stored) {
        localStorage.setItem('wedding_guestbook_list_v2', JSON.stringify(DEFAULT_ENTRIES));
        return DEFAULT_ENTRIES;
      }
      return JSON.parse(stored);
    } catch (err) {
      console.error('Guestbook fetch error:', err);
      return DEFAULT_ENTRIES;
    }
  },

  async addEntry(name: string, message: string, drawingUrl?: string): Promise<GuestbookEntry | null> {
    const timestamp = new Date().toISOString();
    const cleanName = name.trim();
    const cleanMsg = message.trim();
    const compositeMessage = drawingUrl
      ? (cleanMsg ? `${cleanMsg}\n${DRAWING_PREFIX}${drawingUrl}` : `${DRAWING_PREFIX}${drawingUrl}`)
      : cleanMsg;

    // 1. Try Supabase cloud database
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('guestbook')
          .insert([
            {
              name: cleanName,
              message: compositeMessage,
              created_at: timestamp
            }
          ])
          .select()
          .single();

        if (!error && data) {
          const entry = parseEntry(data.id, data.name, data.message, data.created_at || timestamp);
          this.backupLocally(entry);
          return entry;
        } else if (error) {
          console.warn('Supabase guestbook insert error, falling back:', error.message);
        }
      } catch (err) {
        console.warn('Supabase guestbook insert network error:', err);
      }
    }

    // 2. Fallback to localStorage
    try {
      const newEntry: GuestbookEntry = {
        id: Date.now().toString(),
        name: cleanName,
        message: cleanMsg,
        drawingUrl,
        createdAt: timestamp
      };
      this.backupLocally(newEntry);
      return newEntry;
    } catch (err) {
      console.error('Guestbook write error:', err);
      return null;
    }
  },

  backupLocally(entry: GuestbookEntry) {
    try {
      const stored = localStorage.getItem('wedding_guestbook_list_v2');
      const entries: GuestbookEntry[] = stored ? JSON.parse(stored) : DEFAULT_ENTRIES;
      const updated = [entry, ...entries.filter((e) => e.id !== entry.id)];
      localStorage.setItem('wedding_guestbook_list_v2', JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage guestbook backup error', e);
    }
  },

  // Realtime subscription for live guestbook updates
  subscribe(onNewEntry: (entry: GuestbookEntry) => void) {
    if (!isSupabaseConfigured || !supabase) return () => {};

    const channel = supabase
      .channel('guestbook-live')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'guestbook' },
        (payload) => {
          const newRow = payload.new;
          if (newRow) {
            const entry = parseEntry(
              newRow.id,
              newRow.name,
              newRow.message,
              newRow.created_at
            );
            onNewEntry(entry);
          }
        }
      )
      .subscribe();

    return () => {
      if (supabase) {
        supabase.removeChannel(channel);
      }
    };
  }
};
