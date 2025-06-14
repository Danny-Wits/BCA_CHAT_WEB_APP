import { Avatar, Group, Text } from "@mantine/core";
export function timeAgo(isoTime) {
  const diff = Math.floor((Date.now() - new Date(isoTime)) / 1000);
  const [s, m, h, d] = [60, 3600, 86400, 604800];

  if (diff < s) return "just now";
  if (diff < m) return `${Math.floor(diff / s)}m ago`;
  if (diff < h) return `${Math.floor(diff / m)}h ago`;
  if (diff < d) return `${Math.floor(diff / h)}d ago`;
  return `${Math.floor(diff / d)}w ago`;
}

export default function Message({ user, text, time }) {
  return (
    <div>
      <Group>
        <Avatar name={user} color="initials" radius="xl" />
        <div>
          <Text size="sm">{user}</Text>
          <Text size="xs" c="dimmed">
            {timeAgo(time)}
          </Text>
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        {text}
      </Text>
    </div>
  );
}
