"use client";

import React from "react";
import { useParams } from "next/navigation";
import { personDetailsQuery } from "@/_lib/query/query";
import { format } from "date-fns";

export default function PersonDetailsPage() {
  const params = useParams();
  const personId = Number(params.id);
  const { data: person, isLoading, error } = personDetailsQuery(personId);

  if (isLoading) {
    return (
      <div className="px-2 lg:px-40 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-700 h-10 w-3/4 mb-4 rounded animate-pulse"></div>
          <div className="bg-gray-600 h-6 w-1/2 mb-8 rounded animate-pulse"></div>
          <div className="bg-gray-700 h-64 w-64 rounded-full mb-6 mx-auto animate-pulse"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-600 h-4 w-full rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="text-red-500 p-8">Failed to load person details</div>
    );
  if (!person) return <div className="p-8">Person not found</div>;

  return (
    <div className="px-2 lg:px-40 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#111827] mb-2 text-center">
          {person.name}
        </h1>

        {person.known_for_department && (
          <p className="text-gray-600 text-center mb-6">
            {person.known_for_department}
          </p>
        )}

        <div className="flex flex-col md:flex-row gap-8 mb-8 items-center md:items-start">
          <img
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                : "/placeholder-person.png"
            }
            alt={person.name}
            className="w-64 h-64 rounded-full object-cover mx-auto md:mx-0"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Biography</h2>
            <p className="text-gray-700 leading-relaxed">
              {person.biography || "No biography available."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium text-gray-500">Birthday</h3>
            <p className="text-xl font-semibold">
              {person.birthday
                ? format(new Date(person.birthday), "MMMM d, yyyy")
                : "Unknown"}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium text-gray-500">Place of Birth</h3>
            <p className="text-xl font-semibold">
              {person.place_of_birth || "Unknown"}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium text-gray-500">Popularity</h3>
            <p className="text-xl font-semibold">
              {person.popularity.toFixed(0)}
            </p>
          </div>
          {person.deathday && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-medium text-gray-500">Date of Death</h3>
              <p className="text-xl font-semibold">
                {format(new Date(person.deathday), "MMMM d, yyyy")}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
