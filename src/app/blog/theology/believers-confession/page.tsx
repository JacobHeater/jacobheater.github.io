import { BlogRenderer } from '../../components/blog-renderer';
import { BlogEntry } from '../../models/blog-entry';

export default function BelieversConfession() {
    return <BlogRenderer blog={getBlogEntry()} />
}

function getBlogEntry(): BlogEntry {
  return {
    date: new Date('05/02/2025'),
    title: "Believer's Confession",
    description: 'My confession of faith as a believer in Jesus Christ.',
    content: getBlogEntryContent(),
    tags: ['theology', 'faith', 'truth', 'belief', 'knowledge', 'philosophy'],
  };
}

function getBlogEntryContent(): string {
return `
I want to start off by telling you that I wasn't always a believer
in Jesus Christ. I had a Christian upbringing. I was raised in a
Bible-believing family. I went to church every Sunday. I had a pretty
typical Christian upbringing. Perhaps my story is similar to yours.

Now, in my adult life, I have made a clear distinction between
living someone else's faith and living my own. I can't really say
that the faith that I was practicing — or pretending to practice — was
a belief in the truest sense of the word. Does this, then, beg the
question: what does it mean to believe?

Maybe you think that belief in the religious sense is holding
that something is true without evidence for it. As I went through
my adolescence, and into my university years, I, too, thought that
religious belief was for the naive. Science, I told myself, was
where knowledge was; I could truly know what I know. It
wouldn't be until I reached my 30s that I would understand 
that religious belief is the truest truth.

Surely, you, reader, having read that last statement, must think that
I am in some kind of delusion. Or, maybe you are a fellow believer
and you are feeling reassured that you are not alone in your beliefs.
I doubt that I will change the unbelieving mind in one blog entry, but I hope as
you continue reading on — and it is my hope that you will — that you, too,
will discover that religious belief is not just for the naive, but is, in
fact, the most rational of beliefs there is.

I leave you with my confession of faith, and hope that you will continue
reading through future blog entries to discover more about the rational,
defensible, and coherent basis for belief in Jesus Christ.

---

I declare my faith in my Lord and Savior, Jesus Christ. I believe that Jesus 
was not merely a man, nor merely a rabbi. I believe that Jesus is God incarnate – 
divinity in the flesh. I believe that Jesus came to die on the cross as the final 
sacrifice for our sins and that He rose again on the third day, completing the 
final atonement for our sins. I believe that Jesus is alive today and that He 
reigns on the throne as Lord over all. I believe, as John wrote in the Gospels, 
that Christ is the Word of God, the Logos. I believe that nothing came into 
existence except through Him. Finally, I believe that not a single person will 
stand blameless before the Father except through the proclamation of faith in 
Christ as their Lord and Savior.
    `.trim();
}
