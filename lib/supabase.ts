// Minimal stub to avoid build-time errors while migrating off Supabase.
// Any call will throw at runtime to indicate the feature isn't configured.

function notImplemented() {
  throw new Error('Supabase features are not configured. Please migrate this page to MongoDB APIs.');
}

export const supabase: any = {
  from: () => ({
    select: notImplemented,
    insert: notImplemented,
    update: notImplemented,
    delete: notImplemented,
    eq: notImplemented,
    order: notImplemented,
  }),
  auth: {
    signInWithPassword: notImplemented,
    signOut: notImplemented,
    getSession: notImplemented,
    getUser: notImplemented,
  },
  storage: {
    from: () => ({
      upload: notImplemented,
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
};

export type Job = any;
export type Category = any;
export type Banner = any;


