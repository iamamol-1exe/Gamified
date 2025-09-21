import {
  DailyIcon,
  InteractiveGamesIcon,
  MultilingualContentIcon,
  OfflineAccessIcon,
  PerformanceInsightsIcon,
  SmartIcon,
  StreaksIcon,
} from "../shapes/LandingPageShapes";

const SubFeatureItem = ({ icon, title, subtitle }) => (
  <div className="flex items-center space-x-4">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <p className="font-bold text-gray-800">{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  </div>
);

export default SubFeatureItem;
