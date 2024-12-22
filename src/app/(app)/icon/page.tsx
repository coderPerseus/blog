import * as iconList from "@/assets/index";
import { Container } from "@/components/Container";

export default function IconPage() {
	return (
		<Container>
			<div className="flex flex-wrap gap-4">
				{Object.keys(iconList).map((key) => {
					// @ts-ignore
					const Icon = iconList[key];
					return (
						<div key={key} className=" mt-20 flex flex-col items-center">
							<Icon className="h-8 w-8" />
							<div className="text-xs">{key}</div>
						</div>
					);
				})}
			</div>
		</Container>
	);
}
