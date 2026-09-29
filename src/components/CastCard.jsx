import { getImageUrl } from '../api/movieApi'

export default function CastCard({ member }) {
  const photo = getImageUrl(member.profile_path, 'w185')

  return (
    <div className="group flex w-32 flex-shrink-0 flex-col gap-2.5 sm:w-36">
      <div className="aspect-[2/3] w-full overflow-hidden rounded-xl bg-void-700 transition-transform duration-300 group-hover:-translate-y-1">
        {photo ? (
          <img
            src={photo}
            alt={`${member.name} headshot`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl text-mist-500" aria-hidden="true">
            👤
          </div>
        )}
      </div>
      <div>
        <p className="line-clamp-1 text-sm font-semibold text-mist-100">{member.name}</p>
        <p className="line-clamp-1 text-xs text-mist-500">{member.character}</p>
      </div>
    </div>
  )
}
