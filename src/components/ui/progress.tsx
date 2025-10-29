import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const [animatedValue, setAnimatedValue] = React.useState(0);
  React.useEffect(() => {
    if (typeof value === "number") {
      const timeout = setTimeout(() => setAnimatedValue(value), 100);
      return () => clearTimeout(timeout);
    }
  }, [value]);
  return (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-bluegrey-500", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-green-500 transition-transform duration-300 ease-out"
      style={{ transform: `translateX(-${100 - (animatedValue || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
)});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
