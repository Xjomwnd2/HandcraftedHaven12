"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Profile = {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  joinDate: string;
};

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  // Fetch profiles data
  useEffect(() => {
    const fetchProfiles = async () => {
      setTimeout(() => {
        const dummyProfiles = [
          {
            id: 1,
            name: "Jane Smith",
            role: "CEO",
            department: "Executive",
            email: "jane.smith@company.com",
            phone: "(555) 123-4567",
            bio: "Jane has over 15 years of experience in the industry and has led the company to record growth.",
            avatar: "/jane.jpg",
            joinDate: "2018-03-15"
          },
          {
            id: 2,
            name: "Michael Johnson",
            role: "CTO",
            department: "Technology",
            email: "michael.johnson@company.com",
            phone: "(555) 234-5678",
            bio: "Michael oversees all technology initiatives and has a background in software architecture.",
            avatar: "/michael.jpg",
            joinDate: "2019-01-10"
          },
          {
            id: 3,
            name: "Emily Davis",
            role: "Marketing Director",
            department: "Marketing",
            email: "emily.davis@company.com",
            phone: "(555) 345-6789",
            bio: "Emily specializes in digital marketing strategies and brand development.",
            avatar: "/emily.jpg",
            joinDate: "2020-06-22"
          },
          // Add more profiles here
        ];

        setProfiles(dummyProfiles);
        setFilteredProfiles(dummyProfiles);

        // Extract unique departments
        const uniqueDepartments = [...new Set(dummyProfiles.map(profile => profile.department))];
        setDepartments(uniqueDepartments);

        setIsLoading(false);
      }, 1000);
    };

    fetchProfiles();
  }, []);

  // Filter profiles based on search and department
  useEffect(() => {
    const filterProfiles = () => {
      let filtered = profiles;

      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(profile => 
          profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.bio.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter by selected department
      if (selectedDepartment !== 'all') {
        filtered = filtered.filter(profile => profile.department === selectedDepartment);
      }

      setFilteredProfiles(filtered);
    };

    filterProfiles();
  }, [searchQuery, selectedDepartment, profiles]);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle department selection change
  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(event.target.value);
  };

  return (
    <div>
      <h1>Profiles</h1>
      
      {/* Search */}
      <input 
        type="text" 
        placeholder="Search profiles..." 
        value={searchQuery}
        onChange={handleSearchChange}
      />
      
      {/* Department Filter */}
      <select 
        value={selectedDepartment} 
        onChange={handleDepartmentChange}
      >
        <option value="all">All Departments</option>
        {departments.map((department, index) => (
          <option key={index} value={department}>
            {department}
          </option>
        ))}
      </select>
      
      {/* Profiles List */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredProfiles.map(profile => (
            <li key={profile.id}>
              <Link href={`/profiles/${profile.id}`}>
                <div>
                  <img src={profile.avatar} alt={profile.name} width="50" height="50" />
                  <h3>{profile.name}</h3>
                  <p>{profile.role}</p>
                  <p>{profile.department}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
