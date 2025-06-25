import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Music, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const AlbumsTable = () => {
	const { albums, deleteAlbum, fetchAlbums } = useMusicStore();
	const [albumToDelete, setAlbumToDelete] = useState<null | { _id: string; title: string }>(null);

	useEffect(() => {
		fetchAlbums();
	}, [fetchAlbums]);

	const handleDelete = (albumId: string) => {
		deleteAlbum(albumId);
		setAlbumToDelete(null);
	};

	return (
		<div className="relative">
			<Table>
				<TableHeader>
					<TableRow className='hover:bg-zinc-800/50'>
						<TableHead className='w-[50px]'></TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Artist</TableHead>
						<TableHead>Release Year</TableHead>
						<TableHead>Songs</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{albums.map((album) => (
						<TableRow key={album._id} className='hover:bg-zinc-800/50'>
							<TableCell>
								<img src={album.imageUrl} alt={album.title} className='w-10 h-10 rounded object-cover' />
							</TableCell>
							<TableCell className='font-medium'>{album.title}</TableCell>
							<TableCell>{album.artist}</TableCell>
							<TableCell>
								<span className='inline-flex items-center gap-1 text-zinc-400'>
									<Calendar className='h-4 w-4' />
									{album.releaseYear}
								</span>
							</TableCell>
							<TableCell>
								<span className='inline-flex items-center gap-1 text-zinc-400'>
									<Music className='h-4 w-4' />
									{album.songs.length} songs
								</span>
							</TableCell>
							<TableCell className='text-right'>
								<div className='flex gap-2 justify-end'>
									<Button
										variant='ghost'
										size='sm'
										onClick={() => setAlbumToDelete({ _id: album._id, title: album.title })}
										className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
									>
										<Trash2 className='h-4 w-4' />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* Confirmation Modal */}
			{albumToDelete && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
					<div className="bg-zinc-900 rounded-xl shadow-xl p-8 w-full max-w-md border border-zinc-700 animate-fade-in">
						<h2 className="text-xl font-bold text-red-400 mb-2 flex items-center gap-2">
							<Trash2 className="h-5 w-5" /> Delete Album
						</h2>
						<p className="text-zinc-300 mb-6">
							Are you sure you want to delete{" "}
							<span className="font-semibold text-white">{albumToDelete.title}</span>? This action cannot be undone.
						</p>
						<div className="flex gap-3 justify-end">
							<Button
								variant="ghost"
								className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
								onClick={() => setAlbumToDelete(null)}
							>
								Cancel
							</Button>
							<Button
								variant="destructive"
								className="bg-red-500 text-white hover:bg-red-400 shadow-lg"
								onClick={() => handleDelete(albumToDelete._id)}
							>
								Yes, Delete
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default AlbumsTable;
