import React from 'react'

function Footer() {
  return (
    <footer className="border-t-[1.5px] py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{' '}
          <a
            href={'https://twitter.com/nsgpriyanshu'}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            nsgpriyanshu
          </a>
          . The source code is available on{' '}
          <a
            href={'https://github.com/nsgpriyanshu/crecall'}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}

export default Footer
