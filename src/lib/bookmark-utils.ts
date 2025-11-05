import { createPureClient } from './supabase/server';

export interface Bookmark {
  id: string;
  user_id: string;
  hobby_id: string;
  created_at: string;
}

export async function getUserBookmarks(userId: string): Promise<string[]> {
  try {
    const supabase = await createPureClient();
    
    const { data, error } = await supabase
      .from('bookmarks')
      .select('hobby_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching bookmarks:', error);
      return [];
    }

    return data.map((bookmark) => bookmark.hobby_id);
  } catch (error) {
    console.error('Error in getUserBookmarks:', error);
    return [];
  }
}

export async function addBookmark(
  userId: string,
  hobbyId: string
): Promise<boolean> {
  try {
    const supabase = await createPureClient();
    
    const { error } = await supabase
      .from('bookmarks')
      .insert({
        user_id: userId,
        hobby_id: hobbyId,
      });

    if (error) {
      console.error('Error adding bookmark:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in addBookmark:', error);
    return false;
  }
}

export async function removeBookmark(
  userId: string,
  hobbyId: string
): Promise<boolean> {
  try {
    const supabase = await createPureClient();
    
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('hobby_id', hobbyId);

    if (error) {
      console.error('Error removing bookmark:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in removeBookmark:', error);
    return false;
  }
}

export async function isBookmarked(
  userId: string,
  hobbyId: string
): Promise<boolean> {
  try {
    const supabase = await createPureClient();
    
    const { data, error } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('hobby_id', hobbyId)
      .maybeSingle();

    if (error) {
      console.error('Error checking bookmark:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error in isBookmarked:', error);
    return false;
  }
}

