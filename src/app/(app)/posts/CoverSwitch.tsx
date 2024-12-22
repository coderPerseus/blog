"use client";
import { type FC, memo } from "react";

const CoverSwitch: FC = () => {
	// const searchParams = useSearchParams();
	// const value = searchParams.get('s');

	// const router = useRouter();

	// const [open, setOpen] = useState<boolean | null>(null);
	// useEffect(() => {
	// 	if (open === null && typeof value !== 'undefined')
	// 		setOpen(Boolean(Number(value)));
	// }, [value, open]);
	return (
		// <TooltipProvider>
		// 	<Tooltip>
		// 		<TooltipTrigger asChild>
		// 			<span
		// 				className="ml-4 mt-1 text-lg cursor-pointer"
		// 				onClick={() => {
		// 					setOpen(!open);
		// 					router.push(`/posts?s=${Number(!open)}`);
		// 				}}
		// 			>
		// 				{open ? <EyeCloseIcon /> : <EyeOpenIcon />}
		// 			</span>
		// 		</TooltipTrigger>
		// 		<AnimatePresence>
		// 			<TooltipPortal>
		// 				<TooltipContent>
		// 					<motion.div
		// 						initial={{ opacity: 0, scale: 0.96 }}
		// 						animate={{ opacity: 1, scale: 1 }}
		// 						exit={{ opacity: 0, scale: 0.95 }}
		// 					>
		// 						{open ? '隐藏封面' : '显示封面'}
		// 					</motion.div>
		// 				</TooltipContent>
		// 			</TooltipPortal>
		// 		</AnimatePresence>
		// 	</Tooltip>
		// </TooltipProvider>
		<></>
	);
};

export default memo(CoverSwitch);
