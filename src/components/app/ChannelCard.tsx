"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Channel } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { deleteChannel } from "@/lib/api";

interface ChannelCardProps {
  channel: Channel;
  email: string;
  onDeleted?: () => void;
}

export function ChannelCard({ channel, email, onDeleted }: ChannelCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const description = channel.channel_description?.trim();
  const isLong = description && description.length > 80;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteChannel(channel.channel_id, email);
      onDeleted?.();
    } catch {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-xl bg-surface border border-border p-5
        hover:border-border-hover hover:shadow-lg hover:shadow-accent-glow/5
        transition-all duration-300 h-full flex flex-col"
    >
      {/* Delete button */}
      <button
        onClick={() => setConfirmDelete(true)}
        className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center
          text-muted hover:text-red-500 hover:bg-red-500/10
          opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10"
        title="Delete channel"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14M10 11v6M14 11v6" />
        </svg>
      </button>

      {/* Confirm delete overlay */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 rounded-xl bg-surface/95 backdrop-blur-sm
              border border-red-500/30 flex flex-col items-center justify-center gap-4 p-5"
          >
            <p className="text-sm text-center font-medium">
              Delete <span className="text-foreground font-semibold">{channel.channel_title}</span>?
            </p>
            <p className="text-xs text-muted text-center">This will remove the channel and all its analytics data.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                disabled={deleting}
                className="px-4 py-1.5 text-sm rounded-lg border border-border hover:border-border-hover transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-1.5 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors cursor-pointer disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Link href={`/app/channel/${channel.channel_id}?email=${encodeURIComponent(email)}`} className="flex-1">
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-border group-hover:border-accent/30 transition-colors">
            <Image
              src={channel.channel_thumbnail}
              alt={channel.channel_title}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-heading font-semibold text-lg truncate pr-6">
              {channel.channel_title}
            </h3>
            <p className={`text-sm text-muted mt-1 ${expanded ? "" : "line-clamp-2"}`}>
              {description || "No description"}
            </p>
          </div>
        </div>
      </Link>

      {isLong && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setExpanded(!expanded);
          }}
          className="text-xs text-accent hover:text-accent-hover mt-1.5 ml-20 self-start cursor-pointer transition-colors"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}

      <Link href={`/app/channel/${channel.channel_id}?email=${encodeURIComponent(email)}`}>
        <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border">
          <div>
            <div className="font-mono text-base font-bold text-chart-1">
              {formatNumber(channel.total_subscribers)}
            </div>
            <div className="text-xs text-muted mt-0.5">Subscribers</div>
          </div>
          <div>
            <div className="font-mono text-base font-bold text-chart-2">
              {formatNumber(channel.total_view_count)}
            </div>
            <div className="text-xs text-muted mt-0.5">Views</div>
          </div>
          <div>
            <div className="font-mono text-base font-bold text-chart-3">
              {channel.total_video_count}
            </div>
            <div className="text-xs text-muted mt-0.5">Videos</div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
