export type ProjectScreenshot = {
  src: string
  alt: string
  caption: string
}

export type Project = {
  slug: string
  title: string
  summary: string
  description: string
  problemSolved: string
  tools: string[]
  technologies: string[]
  github: string
  liveDemo?: string
  image: string
  screenshots: ProjectScreenshot[]
}

export const projects: Project[] = [
  {
    slug: 'network-traffic-analyzer',
    title: 'Network Traffic Analyzer',
    summary: 'Packet inspection utility for studying TCP/IP behavior, protocol flow, and suspicious traffic patterns.',
    description:
      'A low-level traffic analysis project designed to capture packets, decode core headers, and produce protocol-level summaries for lab networks. The project focuses on understanding how communication patterns reveal system state and potential abuse.',
    problemSolved:
      'This project helps turn raw packet captures into readable operational insight, making it easier to study abnormal flows, protocol misuse, and host behavior during security exercises.',
    tools: ['Wireshark', 'libpcap', 'Linux CLI'],
    technologies: ['C', 'TCP/IP', 'Packet Parsing', 'libpcap'],
    github: 'https://github.com/fardin040/network-traffic-analyzer',
    image: '/projects/network-traffic-analyzer-overview.svg',
    screenshots: [
      {
        src: '/projects/network-traffic-analyzer-capture.svg',
        alt: 'Packet capture view for network traffic analyzer',
        caption: 'Protocol breakdown showing TCP, DNS, and HTTP observations from a sample capture.'
      },
      {
        src: '/projects/network-traffic-analyzer-flow.svg',
        alt: 'Traffic flow visualization diagram',
        caption: 'A simplified flow visualization used to reason about client-server exchanges.'
      }
    ]
  },
  {
    slug: 'custom-port-scanner',
    title: 'Custom Port Scanner',
    summary: 'Focused scanner for studying host discovery, TCP port states, and reconnaissance workflows.',
    description:
      'A custom scanner that probes target hosts, records open ports, and demonstrates the mechanics behind service discovery. Built as a learning project to understand socket behavior, port states, and timing strategies.',
    problemSolved:
      'It provides a transparent learning platform for understanding how scanning engines work instead of treating tool output as a black box.',
    tools: ['Nmap', 'Linux Sockets', 'Terminal'],
    technologies: ['C', 'Sockets', 'POSIX Threads', 'TCP'],
    github: 'https://github.com/fardin040/custom-port-scanner',
    image: '/projects/custom-port-scanner-overview.svg',
    screenshots: [
      {
        src: '/projects/custom-port-scanner-output.svg',
        alt: 'Terminal output from a custom port scanner',
        caption: 'Sample terminal output showing discovered services and timing statistics.'
      },
      {
        src: '/projects/custom-port-scanner-diagram.svg',
        alt: 'SYN scan sequence diagram',
        caption: 'Diagram of a TCP SYN-based discovery workflow used during analysis.'
      }
    ]
  },
  {
    slug: 'linux-telemetry-daemon',
    title: 'Linux Telemetry Daemon',
    summary: 'Host telemetry collector for monitoring CPU, memory, process activity, and system anomalies.',
    description:
      'A lightweight daemon that reads Linux process and resource data to surface operational health signals. The emphasis is on reproducible host observation for troubleshooting, incident triage, and baseline profiling.',
    problemSolved:
      'It makes core telemetry easier to inspect quickly during lab investigations, especially when comparing healthy and degraded system states.',
    tools: ['Linux', '/proc', 'Bash'],
    technologies: ['C', 'Linux APIs', 'System Monitoring', 'Shell'],
    github: 'https://github.com/fardin040/linux-telemetry-daemon',
    image: '/projects/linux-telemetry-daemon-overview.svg',
    screenshots: [
      {
        src: '/projects/linux-telemetry-daemon-metrics.svg',
        alt: 'System telemetry dashboard style output',
        caption: 'Structured console view of CPU, memory, and process telemetry snapshots.'
      },
      {
        src: '/projects/linux-telemetry-daemon-events.svg',
        alt: 'System event monitoring output',
        caption: 'An event-oriented view that highlights spikes and unusual host behavior.'
      }
    ]
  },
  {
    slug: 'vulnerability-research-lab',
    title: 'Vulnerability Research Lab',
    summary: 'Controlled lab environment for reproducing common web weaknesses and documenting mitigations.',
    description:
      'A structured practice lab covering common web attack surfaces, safe reproduction steps, and remediation notes. It is organized to support repeatable experiments and strong technical writeups.',
    problemSolved:
      'It creates a safe research environment for understanding vulnerability mechanics and documenting mitigation logic with clear evidence.',
    tools: ['Burp Suite', 'OWASP Juice Shop', 'Browser DevTools'],
    technologies: ['Python', 'JavaScript', 'HTTP', 'Web Security'],
    github: 'https://github.com/fardin040/vulnerability-research-lab',
    image: '/projects/vulnerability-research-lab-overview.svg',
    screenshots: [
      {
        src: '/projects/vulnerability-research-lab-burp.svg',
        alt: 'Burp Suite request and response workflow',
        caption: 'Request interception and response review inside an isolated practice environment.'
      },
      {
        src: '/projects/vulnerability-research-lab-notes.svg',
        alt: 'Vulnerability lab notes and findings diagram',
        caption: 'Finding notes linking attack path, affected component, and mitigation strategy.'
      }
    ]
  }
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}