"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "How On-Chain Reputation is Changing Hiring",
    category: "Industry Insights",
    date: "Oct 24, 2026",
    readTime: "5 min read",
    image: "bg-gradient-to-br from-accent-purple to-pink-500"
  },
  {
    title: "Understanding the Raven Academy Pathways",
    category: "Tutorials",
    date: "Oct 18, 2026",
    readTime: "8 min read",
    image: "bg-gradient-to-br from-accent-blue to-cyan-500"
  },
  {
    title: "Announcing our Partnership with TON Foundation",
    category: "Announcements",
    date: "Oct 12, 2026",
    readTime: "3 min read",
    image: "bg-gradient-to-br from-gray-700 to-black"
  }
];

export function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-black relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Latest from <span className="text-accent-purple">Raven</span></h2>
            <p className="text-lg text-white/60">
              Insights, tutorials, and announcements from the core team.
            </p>
          </div>
          <button className="text-accent-purple hover:text-white font-medium flex items-center gap-2 transition-colors">
            View All Posts <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="p-0 overflow-hidden group cursor-pointer h-full flex flex-col">
                <div className={`h-48 w-full ${post.image} opacity-80 group-hover:opacity-100 transition-opacity`} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-xs font-semibold mb-3">
                    <span className="text-accent-purple">{post.category}</span>
                    <span className="text-white/40">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-accent-blue transition-colors">
                    {post.title}
                  </h3>
                  <div className="mt-auto text-sm text-white/50">
                    {post.date}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
