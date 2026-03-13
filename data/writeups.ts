export type WriteupPreview = {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
}

export const writeupCategories = [
  'Cybersecurity',
  'Networking',
  'Linux',
  'Cryptography',
  'Lab Notes'
]

export const writeupPreviews: WriteupPreview[] = [
  {
    slug: 'how-tcp-syn-port-scanning-works',
    title: 'How TCP SYN Port Scanning Works',
    description: 'A concise breakdown of half-open scanning, port state inference, and detection considerations.',
    category: 'Networking',
    tags: ['Port Scanning', 'TCP', 'Reconnaissance']
  },
  {
    slug: 'packet-analysis-using-wireshark',
    title: 'Packet Analysis Using Wireshark',
    description: 'Methods for isolating relevant streams, filtering noise, and validating protocol behavior.',
    category: 'Cybersecurity',
    tags: ['Wireshark', 'Packet Analysis', 'Traffic Inspection']
  },
  {
    slug: 'introduction-to-network-forensics',
    title: 'Introduction to Network Forensics',
    description: 'Initial thinking about capture sources, timelines, host correlation, and evidence preservation.',
    category: 'Lab Notes',
    tags: ['Network Forensics', 'Incident Response']
  },
  {
    slug: 'building-a-port-scanner-in-c',
    title: 'Building a Port Scanner in C',
    description: 'A technical note on sockets, concurrency decisions, and limitations in a learning scanner.',
    category: 'Linux',
    tags: ['C', 'Sockets', 'System Programming']
  },
  {
    slug: 'basics-of-cryptographic-protocols',
    title: 'Basics of Cryptographic Protocols',
    description: 'An overview of trust, key exchange, confidentiality, and integrity in modern protocols.',
    category: 'Cryptography',
    tags: ['Cryptography', 'Protocols', 'TLS']
  }
]