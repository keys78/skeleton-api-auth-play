<Input name="punctuality" value={fetchedAss[fetchedData.id].userId === fetchedData.id ? fetchedAss[fetchedData.id].punctuality
    : assessment.punctuality}
    onChange={onChange} label="Punctuality" />