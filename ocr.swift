import Vision
import Foundation
import CoreImage

let args = CommandLine.arguments
if args.count < 2 {
    print("Usage: ocr <image-path>")
    exit(1)
}

let imagePath = args[1]
let url = URL(fileURLWithPath: imagePath)

guard let ciImage = CIImage(contentsOf: url) else {
    print("Failed to load image.")
    exit(1)
}

let requestHandler = VNImageRequestHandler(ciImage: ciImage, options: [:])
let request = VNRecognizeTextRequest { (request, error) in
    guard let observations = request.results as? [VNRecognizedTextObservation] else {
        return
    }
    for observation in observations {
        guard let topCandidate = observation.topCandidates(1).first else { continue }
        print(topCandidate.string)
    }
}

request.recognitionLevel = .accurate

do {
    try requestHandler.perform([request])
} catch {
    print("Error: \(error)")
}
