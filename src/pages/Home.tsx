import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Statistics } from '../components/sections/Statistics'
import { Classified } from '../components/sections/Classified'
import { HiddenTwist } from '../components/sections/HiddenTwist'
import { Timeline } from '../components/sections/Timeline'
import { Institution } from '../components/sections/Institution'
import { Faculty } from '../components/sections/Faculty'
import { Guidelines } from '../components/sections/Guidelines'
import { Venue } from '../components/sections/Venue'
import { FinalCTA } from '../components/sections/FinalCTA'

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Statistics />
      <Classified />
      <HiddenTwist />
      <Timeline />
      <Institution />
      <Faculty />
      <Guidelines />
      <Venue />
      <FinalCTA />
    </>
  )
}
