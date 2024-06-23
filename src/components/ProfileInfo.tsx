export default function ProfileInfo({ info }: { info: string }) {
  const [user] = info.split("@");
  return (
    <div>
      <h3>Welcome</h3>
      <p>{user}</p>
    </div>
  );
}
