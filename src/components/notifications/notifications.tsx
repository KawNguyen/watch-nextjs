"use client"

import { Bell, X, Check, Info, AlertCircle, Gift, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { mockNotifications } from "@/constant/routes"
import Link from "next/link"

type Notification = {
  id: number
  title: string
  description: string
  time: string
  read: boolean
  type?: string
}

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const unreadCount = mockNotifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />
      case "success":
        return <Check className="h-4 w-4 text-green-500" />
      case "gift":
        return <Gift className="h-4 w-4 text-purple-500" />
      case "user":
        return <User className="h-4 w-4 text-indigo-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const markAllAsRead = () => {
    console.log("Mark all as read")
  }

  return (
    <TooltipProvider>
      <div className="relative" ref={dropdownRef}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="relative p-2.5  rounded-xl transition-all duration-200 group"
              onClick={e => {
                e.preventDefault()
                setOpen((v) => !v)
              }}
              aria-label="Notifications"
            >
              <span className="relative block">
                <Bell className="h-6 w-6 text-black dark:text-slate-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>

        {open && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

            {/* Dropdown */}
            <div className="absolute right-0 mt-3 w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Notifications</h3>
                  {unreadCount > 0 && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">{unreadCount} unread</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-black dark:text-black hover:text-blue-700 dark:hover:text-blue-300 font-bold transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {mockNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 px-6">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                      <Bell className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-center">No notifications yet</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 text-center mt-1">
                      {"We'll notify you when something arrives!"}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {mockNotifications.map((notification:Notification) => (
                      <div
                        key={notification.id}
                        className={`relative px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group ${!notification.read ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                          }`}
                      >
                        {/* Unread indicator */}
                        {!notification.read && (
                          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full" />
                        )}

                        <div className="flex gap-3">
                          {/* Icon */}
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                              {getNotificationIcon(notification.type || "info")}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 dark:text-slate-100 text-sm leading-5">
                              {notification.title}
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 leading-5">
                              {notification.description}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs text-slate-500 dark:text-slate-500">{notification.time}</p>
                              {!notification.read && (
                                <span className="text-xs text-black dark:text-blue-400 font-medium">New</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {mockNotifications.length > 0 && (
                <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800">
                  <button className="w-full text-center text-sm text-black dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium py-2 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-colors">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </TooltipProvider>
  )
}

export default NotificationDropdown
