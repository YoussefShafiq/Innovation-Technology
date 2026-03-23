import { Link } from "react-router-dom";
import {
  MdCloudDone,
  MdSecurity,
  MdAutoGraph,
  MdDevices,
  MdIntegrationInstructions,
  MdSupportAgent,
} from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";
import Card from "./Card";

const ICONS = {
  MdCloudDone,
  MdSecurity,
  MdAutoGraph,
  MdDevices,
  MdIntegrationInstructions,
  MdSupportAgent,
};

export const ServiceCard = ({ service, index = 0, showLearnMore = true }) => {
  const Icon = ICONS[service?.icon] || MdCloudDone;
  const isEven = index % 2 === 0;

  return (
    <Card className="flex flex-col gap-5 h-full">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${
          isEven ? "bg-primary/10" : "bg-secondary/10"
        }`}
      >
        <Icon size={26} className={isEven ? "text-primary" : "text-secondary"} />
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-display font-bold text-text-primary mb-2">
          {service?.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          {service?.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(service?.tags || []).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full bg-gray-100 text-text-secondary text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {showLearnMore && (
        <Link
          to="/contact"
          className={`flex items-center gap-1.5 text-sm font-semibold group ${
            isEven ? "text-primary" : "text-secondary"
          }`}
        >
          Learn More
          <HiArrowRight
            className="group-hover:translate-x-1 transition-transform duration-200"
            size={15}
          />
        </Link>
      )}
    </Card>
  );
};

export const ServiceCardSkeleton = () => (
  <Card className="flex flex-col gap-5 h-full animate-pulse">
    <div className="w-14 h-14 rounded-2xl bg-surface border border-gray-200" />

    <div className="flex-1 space-y-3">
      <div className="h-6 w-3/4 rounded-lg bg-surface border border-gray-200" />
      <div className="h-4 w-full rounded-lg bg-surface border border-gray-200" />
      <div className="h-4 w-5/6 rounded-lg bg-surface border border-gray-200" />
    </div>

    <div className="flex flex-wrap gap-2">
      <span className="h-6 w-16 rounded-full bg-surface border border-gray-200" />
      <span className="h-6 w-20 rounded-full bg-surface border border-gray-200" />
      <span className="h-6 w-14 rounded-full bg-surface border border-gray-200" />
    </div>

    <div className="h-4 w-24 rounded-lg bg-surface border border-gray-200" />
  </Card>
);
