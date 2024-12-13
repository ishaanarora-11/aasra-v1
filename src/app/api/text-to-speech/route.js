import axios from 'axios';

export async function POST(request) {
  try {
    const { text } = await request.json();
    
    const data = {
      voiceId: "en-IN-shivani",
      style: "Conversational",
      text: text,
      rate: -50,
      pitch: -13,
      sampleRate: 48000,
      format: "MP3",
      channelType: "MONO",
      pronunciationDictionary: {},
      encodeAsBase64: false,
      variation: 1,
      audioDuration: 0,
      modelVersion: "GEN2"
    };

    const config = {
      method: 'post',
      url: 'https://api.murf.ai/v1/speech/generate',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api-key': 'ap2_924f6927-d639-41a1-81d1-2ba28ed7cbfc'
      },
      data: data
    };

    const response = await axios(config);
    console.log(response.data)
    
    // Validate the response
    if (!response.data || !response.data.audioFile) {
      console.error('Invalid response from Murf API:', response.data);
      throw new Error('Invalid response from speech service');
    }

    // Validate that the audioFile URL is accessible
    // try {
    //   const audioResponse = await axios.head(response.data.audioFile);
    //   if (audioResponse.status !== 200) {
    //     throw new Error('Audio file not accessible');
    //   }
    // } catch (audioError) {
    //   console.error('Audio file validation failed:', audioError);
    //   throw new Error('Generated audio file is not accessible');
    // }
    
    return new Response(JSON.stringify({ 
      audioFile: response.data.audioFile,
      status: 'success'
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in API route:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate speech',
      details: error.response?.data || 'No additional details available'
    }), {
      status: error.response?.status || 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}