import { NavLink } from "react-router-dom";

type SidebarLinkProps = {
  to: string;
  iconSrc: string;
  label: string;
  end?: boolean;
};

export default function SidebarLink({ to, iconSrc, label, end = false }: SidebarLinkProps) {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            isActive
              ? "bg-emerald-700/50 text-white"
              : "text-emerald-100 hover:bg-emerald-700/30"
          }`
        }
      >
        {({ isActive }) => (
          <div className="flex items-center w-full">
            <img 
              src={iconSrc} 
              alt={`${label} Icon`} 
              className={`w-5 h-5 mr-3 transition-all duration-200 filter brightness-0 invert opacity-80
                       group-hover:opacity-100 ${isActive ? 'opacity-100' : ''}`} 
            />
            <span className="truncate flex-1">{label}</span>
            {isActive && (
              <div className="w-1.5 h-1.5 bg-white rounded-full ml-2" />
            )}
          </div>
        )}
      </NavLink>
    </li>
  );
}
