'use client';

export default function PageTitle({ title }: { title: string })
{
    return (
        <h2 className="flex flex-row flex-nowrap items-center mt-24">
            <span className="flex-grow block border-t border-black dark:border-white"></span>
            <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white dark:bg-white dark:text-black">
                {title}
            </span>
            <span className="flex-grow block border-t border-black dark:border-white"></span>
        </h2>
    )
}