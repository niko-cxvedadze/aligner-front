import {ToggleGroupItem} from "@/components/ui/toggle-group.tsx";

interface WorkspaceButtonProps {
    value: string
    name: string
}

export function WorkspaceButton({name, value}: WorkspaceButtonProps) {
    return <ToggleGroupItem value={value} className="w-[45px] h-[45px]" variant="outline">
        {name.split('').slice(0, 2).join('').toUpperCase()}
    </ToggleGroupItem>
}