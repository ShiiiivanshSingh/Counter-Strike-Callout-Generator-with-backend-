// Import all map images
import cacheRadar from "../assets/maps/de_cache_radar.png";
import dust2Radar from "../assets/maps/de_dust2_radar.png";
import infernoRadar from "../assets/maps/de_inferno_radar.png";
import mirageRadar from "../assets/maps/de_mirage_radar.png";
import nukeLowerRadar from "../assets/maps/de_nuke_lower_radar.png";
import nukeRadar from "../assets/maps/de_nuke_radar.png";
import overpassRadar from "../assets/maps/de_overpass_radar.png";
import ancientRadar from "../assets/maps/de_ancient_radar.png";
import trainRadar from "../assets/maps/de_train_radar.png";
import vertigoLowerRadar from "../assets/maps/de_vertigo_lower_radar.png";
import vertigoRadar from "../assets/maps/de_vertigo_radar.png";

const maps = {
  de_dust2: {
    name: "Dust 2",
    src: dust2Radar,
    hotspots: [
      { name: "Long A", top: "35%", left: "75%", description: "Long A doors and pathway" },
      { name: "Short A", top: "45%", left: "60%", description: "Catwalk to A site" },
      { name: "B Tunnels", top: "65%", left: "30%", description: "Entrance to B site" },
      { name: "Mid", top: "55%", left: "45%", description: "Middle area" },
      { name: "CT Spawn", top: "20%", left: "50%", description: "Counter-Terrorist spawn area" },
      { name: "T Spawn", top: "80%", left: "50%", description: "Terrorist spawn area" }
    ]
  },
  de_cache: {
    name: "Cache",
    src: cacheRadar,
    hotspots: [
      { name: "A Main", top: "40%", left: "80%", description: "Main entrance to A site" },
      { name: "Mid", top: "50%", left: "50%", description: "Middle area" },
      { name: "B Main", top: "60%", left: "20%", description: "Main entrance to B site" }
    ]
  },
  de_inferno: {
    name: "Inferno",
    src: infernoRadar,
    hotspots: [
      { name: "A Site", top: "30%", left: "70%", description: "Main area of A site" },
      { name: "B Site", top: "70%", left: "25%", description: "Main area of B site" },
      { name: "Tunnels", top: "60%", left: "20%", description: "Path to B site" },
      { name: "Mid", top: "50%", left: "50%", description: "Middle area" },
      { name: "Banana", top: "65%", left: "35%", description: "Pathway leading to B site" },
      { name: "CT Spawn", top: "20%", left: "55%", description: "Counter-Terrorist spawn" }
    ]
  },
  de_mirage: {
    name: "Mirage",
    src: mirageRadar,
    hotspots: [
      { name: "A Site", top: "30%", left: "65%", description: "Main area of A site" },
      { name: "B Site", top: "70%", left: "35%", description: "Main area of B site" },
      { name: "Mid", top: "50%", left: "50%", description: "Middle area" },
      { name: "T Ramp", top: "75%", left: "45%", description: "Path from Terrorist spawn to A site" },
      { name: "Palace", top: "40%", left: "60%", description: "Access to A site from inside" }
    ]
  },
  de_nuke: {
    name: "Nuke",
    src: nukeRadar,
    hotspots: [
      { name: "A Site", top: "35%", left: "60%", description: "Main area of A site" },
      { name: "B Site", top: "65%", left: "35%", description: "Main area of B site" },
      { name: "Outside", top: "50%", left: "10%", description: "Open outside area" },
      { name: "CT Spawn", top: "20%", left: "50%", description: "Counter-Terrorist spawn" }
    ]
  },
  de_nuke_lower: {
    name: "Nuke Lower",
    src: nukeLowerRadar,
    hotspots: [
      { name: "B Site", top: "65%", left: "35%", description: "Main area of B site" },
      { name: "Ramp", top: "40%", left: "50%", description: "Path leading to B site" },
      { name: "CT Spawn", top: "20%", left: "50%", description: "Counter-Terrorist spawn" }
    ]
  },
  de_overpass: {
    name: "Overpass",
    src: overpassRadar,
    hotspots: [
      { name: "A Site", top: "30%", left: "75%", description: "Main area of A site" },
      { name: "B Site", top: "70%", left: "25%", description: "Main area of B site" },
      { name: "Tunnels", top: "60%", left: "30%", description: "Path to B site" },
      { name: "Mid", top: "50%", left: "50%", description: "Middle area" }
    ]
  },
  de_ancient: {
    name: "Ancient",
    src: ancientRadar,
    hotspots: [
      { name: "A Site", top: "35%", left: "65%", description: "Main area of A site" },
      { name: "B Site", top: "65%", left: "25%", description: "Main area of B site" },
      { name: "Mid", top: "50%", left: "50%", description: "Middle area" }
    ]
  },
  de_train: {
    name: "Train",
    src: trainRadar,
    hotspots: [
      { name: "A Site", top: "30%", left: "70%", description: "Main area of A site" },
      { name: "B Site", top: "70%", left: "30%", description: "Main area of B site" },
      { name: "Mid", top: "50%", left: "50%", description: "Middle area" },
      { name: "Tunnels", top: "60%", left: "20%", description: "Pathway leading to B site" }
    ]
  },
  de_vertigo: {
    name: "Vertigo",
    src: vertigoRadar,
    hotspots: [
      { name: "A Site", top: "35%", left: "65%", description: "Main area of A site" },
      { name: "B Site", top: "70%", left: "30%", description: "Main area of B site" },
      { name: "Mid", top: "50%", left: "50%", description: "Middle area" }
    ]
  },
  de_vertigo_lower: {
    name: "Vertigo Lower",
    src: vertigoLowerRadar,
    hotspots: [
      { name: "B Site", top: "70%", left: "30%", description: "Main area of B site" },
      { name: "A Site", top: "35%", left: "65%", description: "Main area of A site" }
    ]
  }
};

export default maps;
