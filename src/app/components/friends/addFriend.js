function handleAddProfile() {
    const newProfile = {
      image: "/profiles/default.jpg",
      name: `Anggota ${profiles.length + 1}`,
    };
    setProfiles((prev) => [...prev, newProfile]);
  }