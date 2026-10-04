import React, { useState, useEffect } from 'react';
import { ContactMessage } from '../../types/index.ts';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useStore } from '../../context/StoreContext.tsx';
import {
  MessageSquare,
  Mail,
  Phone,
  Trash2,
  CheckCircle,
  Eye,
  Clock,
  X,
  Reply,
} from 'lucide-react';

export const AdminMessages: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const { showToast, settings } = useStore();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/admin/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Failed to load messages', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (msg: ContactMessage, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextRead = !msg.is_read;
    try {
      const res = await authFetch(`/api/admin/messages/${msg.id}/read`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read: nextRead }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, is_read: nextRead } : m))
        );
        if (selectedMessage && selectedMessage.id === msg.id) {
          setSelectedMessage({ ...selectedMessage, is_read: nextRead });
        }
        showToast(nextRead ? 'Message marked as read' : 'Message marked unread');
      }
    } catch {
      showToast('Failed to update read status', 'error');
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await authFetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
        showToast('Message deleted');
      }
    } catch {
      showToast('Failed to delete message', 'error');
    }
  };

  const openMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.is_read) {
      handleToggleRead(msg);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-6">
        <h1 className="font-display text-3xl font-bold text-white tracking-tight">
          Contact Messages
        </h1>
        <p className="mt-1 text-xs text-neutral-400">
          Inquiries, partnership proposals, and user feedback received from the public storefront.
        </p>
      </div>

      {/* Messages List / Table */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950/80 border-b border-neutral-800 text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Sender</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Message Preview</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500">
                    Loading inquiries...
                  </td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500">
                    No messages received yet.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr
                    key={msg.id}
                    onClick={() => openMessage(msg)}
                    className={`cursor-pointer transition-colors ${
                      !msg.is_read
                        ? 'bg-neutral-900/90 font-medium hover:bg-neutral-800/60'
                        : 'hover:bg-neutral-800/30 text-neutral-400'
                    }`}
                  >
                    {/* Read Status */}
                    <td className="py-3.5 px-4 w-12 text-center">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${
                          !msg.is_read ? 'bg-amber-500' : 'bg-transparent border border-neutral-700'
                        }`}
                        title={!msg.is_read ? 'Unread message' : 'Read'}
                      />
                    </td>

                    {/* Sender Name */}
                    <td className="py-3.5 px-4 text-white font-semibold whitespace-nowrap">
                      {msg.name}
                    </td>

                    {/* Contact info */}
                    <td className="py-3.5 px-4 text-neutral-300">
                      <div>{msg.email}</div>
                      {msg.phone && (
                        <div className="text-[11px] text-neutral-500 font-mono">{msg.phone}</div>
                      )}
                    </td>

                    {/* Preview */}
                    <td className="py-3.5 px-4 max-w-sm truncate text-neutral-300">
                      {msg.message}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500 whitespace-nowrap">
                      {new Date(msg.created_at).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={(e) => handleToggleRead(msg, e)}
                          className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                          title={msg.is_read ? 'Mark Unread' : 'Mark Read'}
                        >
                          <CheckCircle className={`w-3.5 h-3.5 ${msg.is_read ? 'text-emerald-400' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => handleDelete(msg.id, e)}
                          className="p-1.5 text-neutral-400 hover:text-rose-400 rounded-lg hover:bg-neutral-800 transition-colors"
                          title="Delete Message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Detail Modal / Drawer */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-bold text-white">Inquiry Details</h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Sender:</span>
                  <span className="font-bold text-white text-sm">{selectedMessage.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Email:</span>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="font-medium text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>{selectedMessage.email}</span>
                    <Mail className="w-3 h-3" />
                  </a>
                </div>
                {selectedMessage.phone && (
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Phone:</span>
                    <span className="font-mono text-neutral-200">{selectedMessage.phone}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Received:</span>
                  <span className="font-mono text-neutral-400">
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Message Content
                </h4>
                <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs sm:text-sm text-neutral-200 leading-relaxed whitespace-pre-line">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
              <button
                onClick={() => handleDelete(selectedMessage.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/50 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Message</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Regarding your message to ${settings.brand_name}`}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
