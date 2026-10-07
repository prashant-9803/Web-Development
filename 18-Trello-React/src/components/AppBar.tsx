const AppBar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-200 bg-white">
      <div className="font-bold text-xl text-zinc-900">
        Trello
      </div>
      <div>
        <a 
          href="/signin" 
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
        >
          Sign In
        </a>
      </div>
    </div>
  )
}

export default AppBar