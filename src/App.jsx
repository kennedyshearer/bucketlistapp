import { useState, useEffect } from "react"
import {
  Authenticator,
  Button,
  Text,
  TextField,
  Heading,
  Flex,
  View,
  Image,
  Grid,
  Divider,
} from "@aws-amplify/ui-react"
import "@aws-amplify/ui-react/styles.css"

import { getUrl, uploadData } from "aws-amplify/storage"
import { generateClient } from "aws-amplify/data"

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

export default function App() {
  // ✅ MUST be inside component
  const client = generateClient({
    authMode: "userPool",
  })

  const [items, setItems] = useState([])

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    const { data } = await client.models.BucketItem.list()

    await Promise.all(
      data.map(async (item) => {
        if (item.image) {
          const link = await getUrl({
            path: ({ identityId }) => `media/${identityId}/${item.image}`,
          })
          item.image = link.url
        }
        return item
      })
    )

    setItems(data)
  }

  async function createItem(event) {
    event.preventDefault()
    const form = new FormData(event.target)

    const { data: newItem } = await client.models.BucketItem.create({
      title: form.get("title"),
      description: form.get("description"),
      image: form.get("image").name,
    })

    if (newItem.image) {
      await uploadData({
        path: ({ identityId }) => `media/${identityId}/${newItem.image}`,
        data: form.get("image"),
      }).result
    }

    fetchItems()
    event.target.reset()
  }

  async function deleteItem(item) {
    await client.models.BucketItem.delete({ id: item.id })
    fetchItems()
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <Flex
          justifyContent="center"
          alignItems="center"
          direction="column"
          width="70%"
          margin="0 auto"
        >
          <Heading level={1}>My Bucket List</Heading>

          <View as="form" margin="3rem 0" onSubmit={createItem}>
            <Flex direction="column" gap="2rem" padding="2rem">
              <TextField
                name="title"
                placeholder="Bucket List Item"
                labelHidden
                required
              />
              <TextField
                name="description"
                placeholder="Description"
                labelHidden
                required
              />
              <View
                as="input"
                name="image"
                type="file"
                accept="image/png, image/jpeg"
              />
              <Button type="submit">Add to Bucket List</Button>
            </Flex>
          </View>

          <Divider />

          <Heading level={2}>My Bucket List Items</Heading>

          <Grid margin="3rem 0" gap="2rem">
            {items.map((item) => (
              <Flex
                key={item.id}
                direction="column"
                alignItems="center"
                gap="1rem"
                border="1px solid #ccc"
                padding="2rem"
                borderRadius="10px"
              >
                <Heading level={3}>{item.title}</Heading>
                <Text fontStyle="italic">{item.description}</Text>

                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    style={{ width: 400 }}
                  />
                )}

                <Button
                  variation="destructive"
                  onClick={() => deleteItem(item)}
                >
                  Delete Item
                </Button>
              </Flex>
            ))}
          </Grid>

          <Button onClick={signOut}>Sign Out</Button>
        </Flex>
      )}
    </Authenticator>
  )
}
