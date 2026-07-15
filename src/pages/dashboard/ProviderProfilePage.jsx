import { useEffect, useState } from "react";
import api from "../../lib/api";
import { countries } from "../../data/countries";

export default function ProviderProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [photoFile, setPhotoFile] = useState(null);
  const [idFile, setIdFile] = useState(null);

  useEffect(() => {
    api
      .get("/providers/me/profile/")
      .then((res) => setProfile(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const formData = new FormData();
    formData.append("display_name", profile.display_name);
    formData.append("bio", profile.bio || "");
    formData.append("nationality", profile.nationality);
    formData.append("chat_rate", profile.chat_rate);
    if (photoFile) formData.append("photo", photoFile);
    if (idFile) formData.append("id_document", idFile);

    try {
      const res = await api.patch("/providers/me/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile(res.data);
      setMessage("Profile updated.");
    } catch (err) {
      setError("Could not save profile. Check your inputs.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-[#6B6B85]">Loading...</p>;
  if (!profile) return null;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-[#1A1A2E]">My profile</h1>
      <p className="text-sm text-[#6B6B85] mt-1">
        {profile.is_verified
          ? "Your profile is verified and visible to clients."
          : "Your profile is pending verification. Upload an ID document below to get verified."}
      </p>

      {message && (
        <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          {message}
        </div>
      )}
      {error && (
        <div className="mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="mt-6 bg-white rounded-2xl border border-[#E7E5F7] p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Display name</label>
          <input
            type="text"
            name="display_name"
            value={profile.display_name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Nationality</label>
            <select
              name="nationality"
              value={profile.nationality}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
              Chat rate (USD)
            </label>
            <input
              type="number"
              name="chat_rate"
              min="1"
              step="0.01"
              value={profile.chat_rate}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Profile photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            className="text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
            ID document (for verification, not shown publicly)
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setIdFile(e.target.files[0])}
            className="text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-[#4338CA] text-white text-sm font-medium rounded-lg px-5 py-2.5 hover:bg-[#372FA8] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save profile"}
        </button>
      </form>
    </div>
  );
}