
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X, BookOpen, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { sanitizeHTML } from '@/utils/security';

const NotesPage = () => {
  const { user, addNote, updateNote, deleteNote } = useAuth();
  const [newNote, setNewNote] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const success = await addNote(newNote.trim());
      if (success) {
        setNewNote('');
      } else {
        setError('Failed to add note. Please check your input and try again.');
      }
    } catch (err) {
      setError('An error occurred while adding the note.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNote = (index: number) => {
    setEditingIndex(index);
    setEditingText(user?.notes[index] || '');
    setError('');
  };

  const handleSaveEdit = async () => {
    if (editingIndex === null || !editingText.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const success = await updateNote(editingIndex, editingText.trim());
      if (success) {
        setEditingIndex(null);
        setEditingText('');
      } else {
        setError('Failed to update note. Please check your input and try again.');
      }
    } catch (err) {
      setError('An error occurred while updating the note.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingText('');
    setError('');
  };

  const handleDeleteNote = (index: number) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(index);
    }
  };

  const renderSafeContent = (content: string) => {
    return sanitizeHTML(content);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-barbie text-primary-foreground shadow-sparkle">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-2">
            <BookOpen className="animate-pulse" />
            My Sparkly ML Notes ✨
            <BookOpen className="animate-pulse" />
          </CardTitle>
          <p className="text-lg opacity-90">
            Capture your learning moments, beautiful! 💖
          </p>
        </CardHeader>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Note */}
      <Card className="shadow-barbie">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Sparkles className="animate-spin" />
            Add New Note
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Textarea
              placeholder="Write your fabulous ML insights here... ✨"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value.slice(0, 2000))}
              className="min-h-[100px] resize-none"
              disabled={isLoading}
            />
            <div className="text-sm text-muted-foreground mt-1">
              {newNote.length}/2000 characters
            </div>
          </div>
          <Button 
            onClick={handleAddNote}
            disabled={!newNote.trim() || isLoading}
            className="bg-gradient-barbie hover:shadow-sparkle"
          >
            <Plus className="w-4 h-4 mr-2" />
            {isLoading ? 'Adding...' : 'Add Note'}
          </Button>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-4">
        {user?.notes.length === 0 ? (
          <Card className="bg-gradient-sparkle text-primary-foreground text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">No notes yet!</h3>
              <p className="opacity-90">Start writing your ML learning journey above! ✨</p>
            </CardContent>
          </Card>
        ) : (
          user?.notes.map((note, index) => (
            <Card key={index} className="shadow-barbie hover:shadow-sparkle transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-primary/10 text-primary">
                        Note #{index + 1}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    
                    {editingIndex === index ? (
                      <div className="space-y-3">
                        <div>
                          <Textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value.slice(0, 2000))}
                            className="min-h-[80px] resize-none"
                            disabled={isLoading}
                          />
                          <div className="text-sm text-muted-foreground mt-1">
                            {editingText.length}/2000 characters
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={handleSaveEdit} 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600"
                            disabled={isLoading}
                          >
                            <Save className="w-4 h-4 mr-1" />
                            {isLoading ? 'Saving...' : 'Save'}
                          </Button>
                          <Button 
                            onClick={handleCancelEdit} 
                            size="sm" 
                            variant="outline"
                            disabled={isLoading}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="text-muted-foreground whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: renderSafeContent(note) }}
                      />
                    )}
                  </div>
                  
                  {editingIndex !== index && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEditNote(index)}
                        size="sm"
                        variant="outline"
                        className="hover:bg-primary/10"
                        disabled={isLoading}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteNote(index)}
                        size="sm"
                        variant="outline"
                        className="hover:bg-red-50 hover:text-red-600"
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesPage;
