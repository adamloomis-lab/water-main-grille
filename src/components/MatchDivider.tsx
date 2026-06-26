// Section divider: two thin brick hairlines striking toward a centered match
// with a blue tip — a nod to the Ohio Blue Tip. `bg` matches the section above
// so the divider reads as a seamless transition on the dark theme.
export default function MatchDivider({ bg = 'bg-paper' }: { readonly bg?: string }) {
  return (
    <div className={bg} aria-hidden="true">
      <div className="container-x">
        <div className="flex items-center justify-center gap-4 py-3 md:py-5">
          <span className="h-px w-full max-w-[200px] bg-gradient-to-r from-transparent to-brick/45" />
          <svg width="74" height="16" viewBox="0 0 74 16" className="shrink-0">
            {/* matchstick */}
            <rect x="2" y="6.5" width="52" height="3" rx="1.5" className="fill-cream-dim" />
            {/* blue tip */}
            <rect x="52" y="2.5" width="17" height="11" rx="5.5" className="fill-bluetip" />
            <rect x="52" y="2.5" width="6" height="11" rx="3" className="fill-bluetip-light" />
          </svg>
          <span className="h-px w-full max-w-[200px] bg-gradient-to-l from-transparent to-brick/45" />
        </div>
      </div>
    </div>
  )
}
