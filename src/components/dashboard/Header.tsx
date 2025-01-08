import React from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

 function Header() {
  return (
    <div className="-ml-12 p-4">
      <div className="flex items-center justify-between bg-white rounded-md shadow-md p-3">
        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full max-w-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 10A7 7 0 1 1 3 10a7 7 0 0 1 14 0z"
            />
          </svg>
          <Input type="text" placeholder="Search" className="w-full" />
        </div>

        {/* Toggle Buttons */}
        <div className="flex items-center gap-6">
          {/* Meat Toggle */}
          <div className="flex items-center space-x-2">
            <Switch defaultChecked />
            <Label>Meat</Label>
          </div>

          {/* Vegan Toggle */}
          <div className="flex items-center space-x-2">
            <Switch defaultChecked />
            <Label>Vegan</Label>
          </div>

          {/* Gluten-Free Toggle */}
          <div className="flex items-center space-x-2">
            <Switch />
            <Label className="text-gray-500">Gluten Free</Label>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Header