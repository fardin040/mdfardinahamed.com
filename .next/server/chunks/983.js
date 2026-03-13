exports.id=983,exports.ids=[983],exports.modules={1877:(e,t,r)=>{Promise.resolve().then(r.bind(r,725)),Promise.resolve().then(r.bind(r,7253))},4477:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},725:(e,t,r)=>{"use strict";r.d(t,{default:()=>l});var a=r(326);r(7577);var i=r(8575),n=r(5007);function s(){let e=n.h.contact.socials.find(e=>e?.name?.toLowerCase().includes("github"))?.link,t=n.h.contact.socials.find(e=>e?.name?.toLowerCase().includes("linkedin"))?.link;return a.jsx("footer",{className:"border-t border-border/50 py-12 mt-16 bg-gradient-to-t from-background to-transparent",children:(0,a.jsxs)("div",{className:"container flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-muted-foreground",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"font-semibold text-foreground",children:n.h.footer.name}),a.jsx("p",{children:n.h.footer.tagline}),a.jsx("p",{className:"text-xs opacity-80 mt-1",children:n.h.footer.subTagline})]}),(0,a.jsxs)("div",{className:"flex flex-col md:items-end gap-2",children:[(0,a.jsxs)("div",{className:"flex flex-wrap gap-4",children:[e&&a.jsx("a",{href:e,target:"_blank",rel:"noopener noreferrer",className:"hover:text-primary transition-colors",children:"GitHub"}),t&&a.jsx("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"hover:text-primary transition-colors",children:"LinkedIn"}),a.jsx("a",{href:`mailto:${n.h.contact.email}`,className:"hover:text-primary transition-colors",children:"Email"})]}),(0,a.jsxs)("p",{children:["\xa9 ",new Date().getFullYear()," ",n.h.footer.name,". All rights reserved."]})]})]})})}function o(e){let{data:t}=(0,i.UL)(e),r=t.home,n=r?.contact?.socials?.find(e=>e?.name?.toLowerCase().includes("github"))?.link,o=r?.contact?.socials?.find(e=>e?.name?.toLowerCase().includes("linkedin"))?.link;return r?a.jsx("footer",{className:"border-t border-border/50 py-12 mt-16 bg-gradient-to-t from-background to-transparent",children:(0,a.jsxs)("div",{className:"container flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-muted-foreground",children:[(0,a.jsxs)("div",{children:[a.jsx("p",{className:"font-semibold text-foreground","data-tina-field":(0,i.Ry)(r.footer,"name"),children:r.footer?.name}),a.jsx("p",{"data-tina-field":(0,i.Ry)(r.footer,"tagline"),children:r.footer?.tagline}),a.jsx("p",{className:"text-xs opacity-80 mt-1","data-tina-field":(0,i.Ry)(r.footer,"subTagline"),children:r.footer?.subTagline})]}),(0,a.jsxs)("div",{className:"flex flex-col md:items-end gap-2",children:[(0,a.jsxs)("div",{className:"flex flex-wrap gap-4",children:[n&&a.jsx("a",{href:n,target:"_blank",rel:"noopener noreferrer",className:"hover:text-primary transition-colors",children:"GitHub"}),o&&a.jsx("a",{href:o,target:"_blank",rel:"noopener noreferrer",className:"hover:text-primary transition-colors",children:"LinkedIn"}),a.jsx("a",{href:`mailto:${r.contact?.email}`,className:"hover:text-primary transition-colors","data-tina-field":(0,i.Ry)(r.contact,"email"),children:"Email"})]}),(0,a.jsxs)("p",{children:["\xa9 ",new Date().getFullYear()," ",r.footer?.name,". All rights reserved."]})]})]})}):a.jsx(s,{})}function l(e){return e.data&&e.query&&e.variables?a.jsx(o,{data:e.data,query:e.query,variables:e.variables}):a.jsx(s,{})}},7253:(e,t,r)=>{"use strict";r.d(t,{default:()=>f});var a=r(326),i=r(7577),n=r(434),s=r(8575);function o(){let[e,t]=(0,i.useState)(!1),[r,n]=(0,i.useState)(!1);return e?a.jsx("button",{onClick:function(){let e=!r;n(e),e?(document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light"))},"aria-label":"Toggle theme",className:"w-8 h-8 flex items-center justify-center",children:r?"\uD83C\uDF19":"☀️"}):a.jsx("button",{"aria-hidden":!0,className:"w-8 h-8"})}let l=[{name:"blue",color:"bg-blue-500"},{name:"emerald",color:"bg-emerald-500"},{name:"violet",color:"bg-violet-500"},{name:"rose",color:"bg-rose-500"}];function c(){let[e,t]=(0,i.useState)("blue"),r=e=>{t(e),localStorage.setItem("site-theme",e),document.documentElement.setAttribute("data-theme",e)};return a.jsx("div",{className:"flex items-center gap-1.5 p-1 glass rounded-full",children:l.map(t=>a.jsx("button",{onClick:()=>r(t.name),"aria-label":`Switch to ${t.name} theme`,className:`w-6 h-6 rounded-full ${t.color} transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-border ${e===t.name?"ring-2 ring-offset-2 ring-border shadow-md scale-105":""}`},t.name))})}var d=r(5007);function m(){return a.jsx("div",{className:"fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pb-2 bg-gradient-to-b from-background/80 to-transparent pointer-events-none",children:(0,a.jsxs)("header",{className:"glass rounded-full px-6 py-3 flex items-center justify-between w-full max-w-4xl pointer-events-auto transition-all shadow-lg shadow-black/5 dark:shadow-white/5",children:[a.jsx(n.default,{href:"/",className:"text-lg font-heading font-bold text-primary dark:text-white tracking-tight",children:d.h.footer.name}),(0,a.jsxs)("nav",{className:"hidden md:flex items-center gap-6",children:[a.jsx(n.default,{href:"/#about",className:"text-base font-medium text-foreground/80 hover:text-primary transition-colors",children:"About"}),a.jsx(n.default,{href:"/#projects",className:"text-base font-medium text-foreground/80 hover:text-primary transition-colors",children:"Projects"}),a.jsx(n.default,{href:"/writeups",className:"text-base font-medium text-foreground/80 hover:text-primary transition-colors",children:"Writeups"}),a.jsx(n.default,{href:"/blog",className:"text-base font-medium text-foreground/80 hover:text-primary transition-colors",children:"Blog"}),a.jsx(n.default,{href:"/resume.pdf",target:"_blank",className:"text-base font-medium text-foreground/80 hover:text-primary transition-colors",children:"Resume"}),a.jsx("div",{className:"h-4 w-px bg-border mx-2"}),a.jsx(c,{}),a.jsx(o,{})]}),(0,a.jsxs)("div",{className:"md:hidden flex items-center gap-3",children:[a.jsx(c,{}),a.jsx(o,{})]})]})})}function u(e){let{data:t}=(0,s.UL)(e),r=t.home;return a.jsx("div",{className:"fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pb-2 bg-gradient-to-b from-background/80 to-transparent pointer-events-none",children:(0,a.jsxs)("header",{className:"glass rounded-full px-6 py-3 flex items-center justify-between w-full max-w-4xl pointer-events-auto transition-all shadow-lg shadow-black/5 dark:shadow-white/5",children:[a.jsx(n.default,{href:"/",className:"text-lg font-heading font-bold text-primary dark:text-white tracking-tight","data-tina-field":(0,s.Ry)(r.footer,"name"),children:r.footer?.name}),(0,a.jsxs)("nav",{className:"hidden md:flex items-center gap-6",children:[a.jsx(n.default,{href:"/#about",className:"text-base font-medium text-foreground/80 hover:text-primary transition-colors",children:"About"}),a.jsx(n.default,{href:"/#projects",className:"text-base font-medium text-foreground/80 hover:text-primary transition-colors",children:"Projects"}),a.jsx(n.default,{href:"/writeups",className:"text-base font-medium text-foreground/80 hover:text-primary transition-colors",children:"Writeups"}),a.jsx(n.default,{href:"/blog",className:"text-base font-medium text-foreground/80 hover:text-primary transition-colors",children:"Blog"}),a.jsx(n.default,{href:"/resume.pdf",target:"_blank",className:"text-base font-medium text-foreground/80 hover:text-primary transition-colors",children:"Resume"}),a.jsx("div",{className:"h-4 w-px bg-border mx-2"}),a.jsx(c,{}),a.jsx(o,{})]}),(0,a.jsxs)("div",{className:"md:hidden flex items-center gap-3",children:[a.jsx(c,{}),a.jsx(o,{})]})]})})}function f(e){return e.data&&e.query&&e.variables?a.jsx(u,{data:e.data,query:e.query,variables:e.variables}):a.jsx(m,{})}},5007:(e,t,r)=>{"use strict";r.d(t,{h:()=>a});let a=JSON.parse('{"hero":{"profilePicture":"/photo_2026-02-24_02-47-46.jpg","badge":"Available for Research Opportunities","headlinePrefix":"Protecting","headlineSuffix":" the Next Generation of Networks","subheadlineLine1":"BSc Electronics & Telecommunication Engineering","subheadlineLine2":"Prospective MSc Cybersecurity Candidate","description":"Bridging the gap between telecommunications infrastructure and advanced network security. Passionate about protocol analysis, digital forensics, and building resilient systems.","primaryCta":{"text":"View Projects","link":"#projects"},"secondaryCta":{"text":"Download Resume","link":"/resume.pdf"}},"about":{"title":"Academic Background & Research Interests","paragraphs":["With a solid foundation in **Electronics & Telecommunication Engineering**, I possess a deep understanding of how data flows across physical and logical layers. During my undergraduate studies, I developed a keen interest in the security aspects of these communication networks.","My goal is to pursue an **MSc in Cybersecurity** to transition from understanding network architectures to actively securing them. I am particularly interested in academic research focusing on *network forensics, cryptographic protocols, and intrusion detection systems (IDS)*."]},"skills":{"title":"Technical Proficiency","categories":[{"id":"tools","title":"Security & Analysis Tools","items":"Wireshark, Nmap, Burp Suite, Metasploit, Snort","color":"primary"},{"id":"programming","title":"Programming & Scripting","items":"C/C++, Python, JavaScript/TypeScript, Bash","color":"accent"},{"id":"systems","title":"Systems & Infrastructure","items":"Linux Administration, TCP/IP Networking, Active Directory","color":"primary"},{"id":"learning","title":"Current Learning Focus","items":"Advanced Network Forensics, TryHackMe Pathways","color":"accent"}]},"certificates":{"title":"Certifications & Training","description":"Continuous learning is essential in cybersecurity. Here are some of the professional certifications and courses I have completed.","list":[{"title":"Google Cybersecurity Professional Certificate","issuer":"Coursera","date":"2023","link":"#"},{"title":"Introduction to Cybersecurity","issuer":"Cisco Networking Academy","date":"2022","link":"#"}]},"projects":{"title":"Relevant Technical Projects","description":"Practical applications demonstrating my understanding of low-level networking and system security engineering.","list":[{"title":"Network Traffic Analyzer","description":"Developed a packet capture and analysis tool from scratch in C using libpcap. Features deep inspection of TCP/IP headers, payload extraction, and protocol statistics generation.","tech":["C","libpcap","TCP/IP"],"github":"#"},{"title":"Custom Port Scanner & Enumerator","description":"Engineered a lightweight, multithreaded port scanner in C. Implemented SYN scanning techniques and basic banner grabbing to understand the mechanics of network reconnaissance.","tech":["C","Sockets","Multithreading"],"github":"#"},{"title":"Linux Telemetry Daemon","description":"Built a CLI system monitoring tool that parses virtual file systems (/proc) to collect real-time CPU, memory, and process telemetry, vital for diagnosing system anomalies.","tech":["C","Linux API","Bash"],"github":"#"},{"title":"Vulnerability Research Lab","description":"A curated repository of practice scripts, mitigation strategies, and lab notes focused on OWASP Top 10 vulnerabilities, tested in isolated environments.","tech":["Python","Burp Suite","Web Sec"],"github":"#"}]},"blog":{"title":"Research & Publications","description":"Documenting my journey into cybersecurity. I write comprehensive articles focusing on protocol deep-dives, lab walk-throughs, and analytical research ahead of my graduate studies.","linkText":"Read my latest articles","linkUrl":"/blog"},"contact":{"title":"Get in Touch","description":"I am actively seeking opportunities to connect with professors, researchers, and professionals in the cybersecurity domain.","email":"fardin.ahamed.ete@gmail.com","socials":[{"name":"LinkedIn","link":"#"},{"name":"GitHub","link":"https://github.com/fardin040"},{"name":"THM","link":"https://tryhackme.com/p/fardinahamed"}]},"footer":{"name":"Md Fardin Ahamed","tagline":"Cybersecurity Enthusiast","subTagline":"Professional portfolio for security engineering, technical research, and MSc applications."}}')},2039:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d,metadata:()=>c});var a=r(9510);r(7272),r(1159);var i=r(8570);let n=(0,i.createProxy)(String.raw`/home/gray-eye/Desktop/mdfardinahamed.com/components/Nav.tsx#default`),s=(0,i.createProxy)(String.raw`/home/gray-eye/Desktop/mdfardinahamed.com/components/Footer.tsx#default`);var o=r(6848),l=r(6424);let c={metadataBase:new URL("https://mdfardinahamed.com"),title:{default:"Md Fardin Ahamed",template:"%s | Md Fardin Ahamed"},description:"Md Fardin Ahamed is a cybersecurity-focused engineering student from Bangladesh building a professional portfolio in network security, protocol analysis, digital forensics, and security research.",keywords:["Md Fardin Ahamed","Fardin Ahamed","Cybersecurity","Telecommunication Engineering","Network Security","Protocol Analysis","Digital Forensics","Security Research Portfolio"],openGraph:{title:"Md Fardin Ahamed | Cybersecurity Portfolio",description:"Professional cybersecurity portfolio featuring projects, technical writeups, research notes, and academic goals focused on MSc study and security engineering.",url:"https://mdfardinahamed.com",siteName:"Md Fardin Ahamed",locale:"en_US",type:"website",images:[{url:"/og-preview.svg",width:1200,height:630,alt:"Md Fardin Ahamed cybersecurity portfolio preview"}]},twitter:{card:"summary_large_image",title:"Md Fardin Ahamed | Cybersecurity Portfolio",description:"Projects, writeups, research notes, and MSc-focused cybersecurity portfolio.",images:["/og-preview.svg"]},robots:{index:!0,follow:!0,googleBot:{index:!0,follow:!0,"max-video-preview":-1,"max-image-preview":"large","max-snippet":-1}},alternates:{canonical:"https://mdfardinahamed.com"},icons:{icon:"/favicon.svg?v=2",apple:"/favicon.svg?v=2"}};async function d({children:e}){let t=(0,l.t)()?await (0,o.an)():null;return a.jsx("html",{lang:"en",className:"scroll-smooth",children:a.jsx("body",{className:"font-sans",children:(0,a.jsxs)("div",{className:"min-h-screen flex flex-col pt-16",children:[a.jsx(n,{data:t?.data,query:t?.query,variables:t?.variables}),a.jsx("main",{className:"flex-1 w-full max-w-[100vw] overflow-x-hidden",children:e}),a.jsx(s,{data:t?.data,query:t?.query,variables:t?.variables})]})})})}},6424:(e,t,r)=>{"use strict";function a(){return!!(process.env.NEXT_PUBLIC_TINA_CLIENT_ID&&process.env.TINA_TOKEN)}r.d(t,{t:()=>a})},6848:(e,t,r)=>{"use strict";r.d(t,{jp:()=>b,an:()=>y,z_:()=>v,aw:()=>w,fl:()=>j});var a=r(1994);function i(e,...t){let r="";return e.forEach((e,a)=>{r+=e+(t[a]||"")}),r}let n=i`
    fragment HomeParts on Home {
  __typename
  hero {
    __typename
    profilePicture
    badge
    headlinePrefix
    headlineSuffix
    subheadlineLine1
    subheadlineLine2
    description
    primaryCta {
      __typename
      text
      link
    }
    secondaryCta {
      __typename
      text
      link
    }
  }
  about {
    __typename
    title
    paragraphs
  }
  skills {
    __typename
    title
    categories {
      __typename
      id
      title
      items
      color
    }
  }
  certificates {
    __typename
    title
    description
    list {
      __typename
      title
      issuer
      date
      link
    }
  }
  projects {
    __typename
    title
    description
    list {
      __typename
      title
      description
      tech
      github
    }
  }
  blog {
    __typename
    title
    description
    linkText
    linkUrl
  }
  contact {
    __typename
    title
    description
    email
    socials {
      __typename
      name
      link
    }
  }
  footer {
    __typename
    name
    tagline
    subTagline
  }
}
    `,s=i`
    fragment BlogParts on Blog {
  __typename
  title
  date
  description
  category
  tags
  body
}
    `,o=i`
    fragment WriteupsParts on Writeups {
  __typename
  title
  date
  description
  category
  tags
  body
}
    `,l=i`
    query home($relativePath: String!) {
  home(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomeParts
  }
}
    ${n}`,c=i`
    query homeConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomeFilter) {
  homeConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomeParts
      }
    }
  }
}
    ${n}`,d=i`
    query blog($relativePath: String!) {
  blog(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BlogParts
  }
}
    ${s}`,m=i`
    query blogConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BlogFilter) {
  blogConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BlogParts
      }
    }
  }
}
    ${s}`,u=i`
    query writeups($relativePath: String!) {
  writeups(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...WriteupsParts
  }
}
    ${o}`,f=i`
    query writeupsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: WriteupsFilter) {
  writeupsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...WriteupsParts
      }
    }
  }
}
    ${o}`,h=e=>async(t,r,a)=>{let i=e.apiUrl;if(a?.branch){let t=e.apiUrl.lastIndexOf("/");i=e.apiUrl.substring(0,t+1)+a.branch}let n=await e.request({query:t,variables:r,url:i},a);return{data:n?.data,errors:n?.errors,query:t,variables:r||{}}},g=(0,a.eI)({cacheDir:"/home/gray-eye/Desktop/mdfardinahamed.com/tina/__generated__/.cache/1773395198312",url:"https://content.tinajs.io/2.1/content/00000000-0000-0000-0000-000000000000/github/main",token:"000000000000000000000000000000000000000",queries:e=>(function(e){return{home:(t,r)=>e(l,t,r),homeConnection:(t,r)=>e(c,t,r),blog:(t,r)=>e(d,t,r),blogConnection:(t,r)=>e(m,t,r),writeups:(t,r)=>e(u,t,r),writeupsConnection:(t,r)=>e(f,t,r)}})(h(e))});function p(e){if(e&&e.length>0)throw Error(e.map(e=>e.message).join(", "))}function x(e){return[...e].sort((e,t)=>{let r=new Date(e.date||"").getTime();return new Date(t.date||"").getTime()-r})}async function y(){let e={relativePath:"home.json"},t=await g.queries.home(e);return p(t.errors),{data:t.data,query:l,variables:e}}async function b(e){let t={relativePath:`${e}.md`},r=await g.queries.blog(t);return p(r.errors),{data:r.data,query:d,variables:t}}async function v(e){let t={relativePath:`${e}.md`},r=await g.queries.writeups(t);return p(r.errors),{data:r.data,query:u,variables:t}}async function w(){let e=await g.queries.blogConnection();return p(e.errors),x(e.data.blogConnection.edges?.map(e=>e?.node).filter(e=>!!e).map(e=>({slug:e._sys.filename,title:e.title,description:e.description||"",date:e.date,category:e.category||"",tags:(e.tags||[]).filter(e=>!!e)}))||[])}async function j(){let e=await g.queries.writeupsConnection();return p(e.errors),x(e.data.writeupsConnection.edges?.map(e=>e?.node).filter(e=>!!e).map(e=>({slug:e._sys.filename,title:e.title,description:e.description||"",date:e.date,category:e.category||"",tags:(e.tags||[]).filter(e=>!!e)}))||[])}},7272:()=>{}};