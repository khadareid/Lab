import  AppHeader  from "@/components/dashboard/Header"
import { AppSidebar } from "@/components/dashboard/Sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import {createBrowserRouter ,Outlet} from 'react-router-dom'

export default function Page() {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <AppSidebar />
        <div className="flex flex-col">
          <AppHeader />
          <main className="flex-1">
<Outlet/>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

