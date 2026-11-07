"use client";
import { useState } from "react";

export default function EventTabs() {
  const [activeTab, setActiveTab] = useState("upcoming");
  return <section className="umsEventTabs" aria-label="Event categories">
    <div className="umsEventTabList" role="tablist" aria-label="Event categories">
      <button type="button" role="tab" aria-selected={activeTab === "upcoming"} className={activeTab === "upcoming" ? "active" : ""} onClick={() => setActiveTab("upcoming")}>Upcoming Events</button>
      <button type="button" role="tab" aria-selected={activeTab === "racing"} className={activeTab === "racing" ? "active" : ""} onClick={() => setActiveTab("racing")}>Racing</button>
    </div>
    {activeTab === "upcoming" ? <div className="eventTbc" role="tabpanel">
      <span className="eventIcon" aria-hidden="true">◈</span>
      <div><p className="eyebrow">EVENT LISTINGS</p><h2>Upcoming events</h2><p>Event dates and information are being confirmed. Check back here for updates, or join the UMS Discord for announcements.</p></div>
      <a className="discordButton" href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noopener noreferrer">Join the UMS Discord <span aria-hidden="true">↗</span></a>
    </div> : <div className="eventTbc racingComingSoon" role="tabpanel">
      <span className="eventIcon" aria-hidden="true">🏁</span>
      <div><p className="eyebrow">UMS RACING</p><h2>Racing events</h2><p>No racing events have been added just yet. Keep an eye out — details will appear here when they’re ready.</p></div>
    </div>}
  </section>;
}
