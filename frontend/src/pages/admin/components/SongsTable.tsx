import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Trash2 } from "lucide-react";
import { useState } from "react";

const SongsTable = () => {
	const { songs, isLoading, error, deleteSong, fetchStats } = useMusicStore();
	const [songToDelete, setSongToDelete] = useState<null | { _id: string; title: string }>(null);
	const [deleting, setDeleting] = useState(false);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-zinc-400'>Loading songs...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-red-400'>{error}</div>
			</div>
		);
	}

	const handleDeleteSong = async () => {
		if (!songToDelete) return;
		setDeleting(true);
		await deleteSong(songToDelete._id);
		await fetchStats();
		setDeleting(false);
		setSongToDelete(null);
	};

	return (
		<div className="relative">
			<Table>
				<TableHeader>
					<TableRow className='hover:bg-zinc-800/50'>
						<TableHead className='w-[50px]'></TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Artist</TableHead>
						<TableHead>Release Date</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{songs.map((song) => (
						<TableRow key={song._id} className='hover:bg-zinc-800/50'>
							<TableCell>
								<img src={song.imageUrl} alt={song.title} className='size-10 rounded object-cover' />
							</TableCell>
							<TableCell className='font-medium'>{song.title}</TableCell>
							<TableCell>{song.artist}</TableCell>
							<TableCell>
								<span className='inline-flex items-center gap-1 text-zinc-400'>
									<Calendar className='h-4 w-4' />
									{song.createdAt.split("T")[0]}
								</span>
							</TableCell>
							<TableCell className='text-right'>
								<div className='flex gap-2 justify-end'>
									<Button
										variant={'ghost'}
										size={'sm'}
										className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
										onClick={() => setSongToDelete({ _id: song._id, title: song.title })}
									>
										<Trash2 className='size-4' />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* Confirmation Modal */}
			{songToDelete && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
					<div className="bg-zinc-900 rounded-xl shadow-xl p-8 w-full max-w-md border border-zinc-700 animate-fade-in">
						<h2 className="text-xl font-bold text-red-400 mb-2 flex items-center gap-2">
							<Trash2 className="h-5 w-5" /> Delete Song
						</h2>
						<p className="text-zinc-300 mb-6">
							Are you sure you want to delete <span className="font-semibold text-white">{songToDelete.title}</span>? This action cannot be undone.
						</p>
						<div className="flex gap-3 justify-end">
							<Button
								disabled={deleting}
								variant="ghost"
								className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
								onClick={() => setSongToDelete(null)}
							>
								Cancel
							</Button>
							<Button
								disabled={deleting}
								variant="destructive"
								className="bg-red-500 text-white hover:bg-red-400 shadow-lg"
								onClick={handleDeleteSong}
							>
								{deleting ? "Deleting..." : "Yes, Delete"}
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default SongsTable;
