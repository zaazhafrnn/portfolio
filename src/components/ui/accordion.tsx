"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextType {
    openItems: Set<string>;
    toggleItem: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType | undefined>(
    undefined
);

function useAccordion() {
    const context = React.useContext(AccordionContext);
    if (!context) {
        throw new Error("useAccordion must be used within Accordion");
    }
    return context;
}

interface AccordionProps {
    children: React.ReactNode;
    type?: "single" | "multiple";
    defaultValue?: string | string[];
    className?: string;
}

function Accordion({
    children,
    type = "single",
    defaultValue,
    className,
}: AccordionProps) {
    const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
        if (defaultValue) {
            return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
        }
        return new Set();
    });

    const toggleItem = React.useCallback(
        (value: string) => {
            setOpenItems((prev) => {
                const next = new Set(prev);
                if (type === "single") {
                    next.clear();
                    if (!prev.has(value)) {
                        next.add(value);
                    }
                } else {
                    if (next.has(value)) {
                        next.delete(value);
                    } else {
                        next.add(value);
                    }
                }
                return next;
            });
        },
        [type]
    );

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem }}>
            <div className={cn("w-full", className)}>{children}</div>
        </AccordionContext.Provider>
    );
}

interface AccordionItemProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

function AccordionItem({ value, children, className }: AccordionItemProps) {
    return (
        <div className={cn("border-b border-border", className)}>{children}</div>
    );
}

interface AccordionTriggerProps {
    children: React.ReactNode;
    className?: string;
}

function AccordionTrigger({ children, className }: AccordionTriggerProps) {
    const { openItems, toggleItem } = useAccordion();
    const itemValue = React.useContext(AccordionItemContext);
    const isOpen = openItems.has(itemValue);

    return (
        <button
            type="button"
            onClick={() => toggleItem(itemValue)}
            className={cn(
                "flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-90",
                className
            )}
            data-state={isOpen ? "open" : "closed"}
        >
            {children}
            <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </button>
    );
}

const AccordionItemContext = React.createContext<string>("");

function AccordionItemWithContext({
    value,
    children,
    className,
}: AccordionItemProps) {
    return (
        <AccordionItemContext.Provider value={value}>
            <AccordionItem value={value} className={className}>
                {children}
            </AccordionItem>
        </AccordionItemContext.Provider>
    );
}

interface AccordionContentProps {
    children: React.ReactNode;
    className?: string;
}

function AccordionContent({ children, className }: AccordionContentProps) {
    const { openItems } = useAccordion();
    const itemValue = React.useContext(AccordionItemContext);
    const isOpen = openItems.has(itemValue);

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className={cn("pb-4 pt-0", className)}>{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Export the component with context wrapper
export {
    Accordion,
    AccordionItemWithContext as AccordionItem,
    AccordionTrigger,
    AccordionContent,
};

