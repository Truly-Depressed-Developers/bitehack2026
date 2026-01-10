'use client';

import { trpc } from '@/trpc/client';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useSession } from 'next-auth/react';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function MessageList({ chatId }: { chatId: string }) {
  const { data, isLoading } = trpc.message.byChat.useQuery({ chatId });

  if (isLoading) return <div className="text-sm text-muted-foreground">Loading messages...</div>;
  if (!data || data.length === 0)
    return <div className="text-sm text-muted-foreground">No messages</div>;

  return (
    <ul className="space-y-1">
      {data.map((m) => (
        <li key={m.id} className="text-sm">
          <span className="font-mono text-xs text-muted-foreground">
            {new Date(m.timestamp).toLocaleString()}:
          </span>{' '}
          <span className="font-semibold">{m.senderId}</span> — {m.content}
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  const { data: session, status } = useSession();
  const tagsQ = trpc.tag.list.useQuery();
  const businessesQ = trpc.business.list.useQuery();
  const adspacesQ = trpc.adspace.list.useQuery();
  const adspaceTypesQ = trpc.adspace.types.useQuery();
  const chatsQ = trpc.chat.list.useQuery();

  const loadingAny = useMemo(
    () =>
      tagsQ.isLoading ||
      businessesQ.isLoading ||
      adspacesQ.isLoading ||
      adspaceTypesQ.isLoading ||
      chatsQ.isLoading,
    [
      tagsQ.isLoading,
      businessesQ.isLoading,
      adspacesQ.isLoading,
      adspaceTypesQ.isLoading,
      chatsQ.isLoading,
    ],
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Test Data Summary</h1>
      <Section title="Session User">
        {status === 'loading' ? (
          <div className="text-sm text-muted-foreground">Loading session...</div>
        ) : !session?.user ? (
          <div className="text-sm text-muted-foreground">Not signed in</div>
        ) : (
          <div className="space-y-1">
            <div>
              <span className="font-semibold">ID:</span> {session.user.id}
            </div>
            <div>
              <span className="font-semibold">First name:</span> {session.user.firstName}
            </div>
            <div>
              <span className="font-semibold">Last name:</span> {session.user.lastName}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {session.user.email}
            </div>
          </div>
        )}
      </Section>
      {loadingAny && <div className="text-sm text-muted-foreground">Loading datasets...</div>}

      <Section title={`Tags (${tagsQ.data?.length ?? 0})`}>
        <div className="flex flex-wrap gap-2">
          {tagsQ.data?.map((t) => (
            <Badge key={t.id}>{t.name}</Badge>
          ))}
        </div>
      </Section>

      <Section title={`Businesses (${businessesQ.data?.length ?? 0})`}>
        <ul className="space-y-3">
          {businessesQ.data?.map((b) => (
            <li key={b.id}>
              <div className="font-semibold">{b.name}</div>
              <div className="text-sm text-muted-foreground">{b.address}</div>
              <div className="text-sm">
                NIP: {b.nip} | PKD: {b.pkd}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {b.tags.map((t) => (
                  <Badge key={t.id} variant="outline">
                    {t.name}
                  </Badge>
                ))}
              </div>
              <Separator className="my-2" />
              <div className="text-sm text-muted-foreground">
                Adspaces: {('adspaces' in b ? (b as any).adspaces?.length : 0) ?? 0}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={`Adspaces (${adspacesQ.data?.length ?? 0})`}>
        <ul className="space-y-2">
          {adspacesQ.data?.map((a) => (
            <li key={a.id} className="flex flex-col">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{a.id.slice(0, 6)}</Badge>
                <span className="font-semibold">{a.name}</span>
                <Badge variant="outline">{a.type.name}</Badge>
                <span className="text-xs text-muted-foreground">
                  {a.maxWidth}x{a.maxHeight}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Business: {a.business.name}</div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={`Adspace Types (${adspaceTypesQ.data?.length ?? 0})`}>
        <div className="flex flex-wrap gap-2">
          {adspaceTypesQ.data?.map((t) => (
            <Badge key={t.id} variant="outline">
              {t.name}
            </Badge>
          ))}
        </div>
      </Section>

      <Section title={`Chats (${chatsQ.data?.length ?? 0})`}>
        <ul className="space-y-4">
          {chatsQ.data?.map((c) => (
            <li key={c.id}>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{c.id.slice(0, 6)}</Badge>
                <span className="font-semibold">
                  {c.participants[0].firstName} {c.participants[0].lastName}
                </span>
                <span className="text-muted-foreground">↔</span>
                <span className="font-semibold">
                  {c.participants[1].firstName} {c.participants[1].lastName}
                </span>
                <Badge variant="outline">adspaces: {c.connectedAdspaces.length}</Badge>
              </div>
              <div className="mt-2">
                <MessageList chatId={c.id} />
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
